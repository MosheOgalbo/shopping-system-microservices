import React, { useMemo, useState } from 'react';
import { useGetProductsQuery, useGetProductsByCategoryQuery } from '../services/productsApi';
import { useGetCategoriesQuery } from '../services/categoriesApi';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import FilterBar from '../components/FilterBar';
import ResultsInfo from '../components/ResultsInfo';
import ProductsGrid from '../components/ProductsGrid';
import CartPanel from '../components/CartPanel';
import { toProduct } from '../util/products';

const ShoppingScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

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

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return a.name.localeCompare(b.name, 'he');
    }
  });

  const selectedCategoryName = selectedCategoryId
    ? categories.find(category => category.Id === selectedCategoryId)?.Name || ''
    : '';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-8 text-right">
            <p className="text-sm font-semibold text-emerald-700">רשימת קניות</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">בחרו מוצרים לסל</h1>
            <p className="mt-2 text-slate-600">הקטגוריות והמוצרים נטענים מהשרת. בחרו קטגוריה, עדכנו כמות, והוסיפו לסל.</p>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
            <FilterBar
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onCategoryChange={setSelectedCategoryId}
              sortBy={sortBy}
              onSortChange={setSortBy}
              categoriesLoading={categoriesLoading}
            />
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          {(activeQuery.isLoading || activeQuery.isFetching) && (
            <div className="py-16 text-center" role="status">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-700" />
              <p className="text-slate-600">טוען מוצרים...</p>
            </div>
          )}

          {(activeQuery.isError || categoriesError) && (
            <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800" role="alert">
              לא הצלחנו לטעון את הקטלוג מהשרת. ודאו ששירות המוצרים פעיל ונסו לרענן.
            </div>
          )}

          {!activeQuery.isLoading && !activeQuery.isFetching && (
            <>
              <ResultsInfo
                count={sorted.length}
                searchTerm={searchTerm}
                category={selectedCategoryName}
              />
              <ProductsGrid products={sorted} />
            </>
          )}
        </div>
        <CartPanel />
      </main>
    </div>
  );
};

export default ShoppingScreen;
