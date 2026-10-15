import React, { useEffect, useMemo, useState } from 'react';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductsQuery } from '../services/catalogApi';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import FilterBar from '../components/FilterBar';
import ResultsInfo from '../components/ResultsInfo';
import ProductsGrid from '../components/ProductsGrid';
import CartPanel from '../components/CartPanel';
import { translateCatalogLabel } from '../i18n/catalog';
import { SearchSuggestion } from '../types';
import { toProduct } from '../util/products';

function matchesSearch(
  product: { name: string; description?: string },
  rawQuery: string,
  t: TFunction
): boolean {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;

  const translatedName = translateCatalogLabel(t, 'names', product.name).toLowerCase();
  const translatedDescription = translateCatalogLabel(t, 'descriptions', product.description).toLowerCase();
  return (
    product.name.toLowerCase().includes(query) ||
    product.description?.toLowerCase().includes(query) ||
    translatedName.includes(query) ||
    translatedDescription.includes(query)
  );
}

const ShoppingScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(searchTerm), 200);
    return () => window.clearTimeout(timer);
  }, [searchTerm]);

  const { data: categories = [], isLoading: categoriesLoading, isError: categoriesError } = useGetCategoriesQuery();
  const allProductsQuery = useGetProductsQuery(undefined, { skip: selectedCategoryId !== null });
  const categoryProductsQuery = useGetProductsByCategoryQuery(selectedCategoryId ?? 0, {
    skip: selectedCategoryId === null,
  });

  const activeQuery = selectedCategoryId !== null ? categoryProductsQuery : allProductsQuery;
  const products = useMemo(
    () => (activeQuery.data ?? []).map(toProduct),
    [activeQuery.data]
  );

  const suggestions: SearchSuggestion[] = useMemo(() => {
    return products
      .filter(product => matchesSearch(product, debouncedSearch, t))
      .map(product => ({
        id: product.id,
        name: translateCatalogLabel(t, 'names', product.name),
        category: translateCatalogLabel(t, 'categories', product.category),
        price: product.price,
      }));
  }, [products, debouncedSearch, t]);

  const filtered = products.filter(product => matchesSearch(product, debouncedSearch, t));

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default: {
        const nameA = translateCatalogLabel(t, 'names', a.name);
        const nameB = translateCatalogLabel(t, 'names', b.name);
        return nameA.localeCompare(nameB, i18n.language);
      }
    }
  });

  const selectedCategoryName = selectedCategoryId
    ? categories.find(category => category.Id === selectedCategoryId)?.Name || ''
    : '';

  const handleSelectSuggestion = (productId: string) => {
    const product = products.find(item => item.id === productId);
    if (product) {
      setSearchTerm(translateCatalogLabel(t, 'names', product.name));
    }

    setHighlightedId(productId);
    window.requestAnimationFrame(() => {
      document.getElementById(`product-${productId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  useEffect(() => {
    if (!highlightedId) return undefined;
    const timer = window.setTimeout(() => setHighlightedId(null), 1600);
    return () => window.clearTimeout(timer);
  }, [highlightedId]);

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />

      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-8 text-start">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{t('shopping.eyebrow')}</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl dark:text-white">{t('shopping.title')}</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{t('shopping.subtitle')}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                suggestions={suggestions}
                onSelectSuggestion={handleSelectSuggestion}
                suggestionsReady={!activeQuery.isLoading && !activeQuery.isFetching}
              />
              <FilterBar
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onCategoryChange={handleCategoryChange}
                sortBy={sortBy}
                onSortChange={setSortBy}
                categoriesLoading={categoriesLoading}
              />
            </div>
          </div>
        </div>
      </section>

      <main
        id="main-content"
        className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]"
        tabIndex={-1}
      >
        <div>
          {(activeQuery.isLoading || activeQuery.isFetching) && (
            <div className="py-16 text-center" role="status">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-700 dark:border-slate-600" aria-hidden="true" />
              <p className="text-slate-600 dark:text-slate-300">{t('shopping.loading')}</p>
            </div>
          )}

          {(activeQuery.isError || categoriesError) && (
            <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-200" role="alert">
              {t('shopping.loadError')}
            </div>
          )}

          {!activeQuery.isLoading && !activeQuery.isFetching && (
            <>
              <ResultsInfo
                count={sorted.length}
                searchTerm={debouncedSearch}
                category={selectedCategoryName}
              />
              <ProductsGrid products={sorted} highlightedId={highlightedId} />
            </>
          )}
        </div>
        <div className="hidden md:block">
          <CartPanel />
        </div>
      </main>
    </div>
  );
};

export default ShoppingScreen;
