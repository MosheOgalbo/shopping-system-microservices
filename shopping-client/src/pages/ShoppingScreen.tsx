import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setBackendProducts, setLoading, setError } from '../features/products/productsSlice';
import { useGetProductsQuery, useGetProductsByCategoryQuery } from '../services/productsApi';
import { useGetCategoriesQuery } from '../services/categoriesApi';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import FilterBar from '../components/FilterBar';
import ResultsInfo from '../components/ResultsInfo';
import ProductsGrid from '../components/ProductsGrid';

const ShoppingScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(s => s.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // קריאות API
  const { data: categories = [], isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: allProducts, error: allProductsError, isLoading: allProductsLoading } = useGetProductsQuery(undefined, {
    skip: selectedCategoryId !== null // דלג על הקריאה אם נבחרה קטגוריה ספציפית
  });

  const { data: categoryProducts, error: categoryProductsError, isLoading: categoryProductsLoading } = useGetProductsByCategoryQuery(selectedCategoryId!, {
    skip: selectedCategoryId === null // דלג על הקריאה אם לא נבחרה קטגוריה
  });

  // עדכון המוצרים ב-Redux
  useEffect(() => {
    const currentProducts = selectedCategoryId !== null ? categoryProducts : allProducts;
    if (currentProducts) {
      dispatch(setBackendProducts(currentProducts));
    }
  }, [allProducts, categoryProducts, selectedCategoryId, dispatch]);

  // עדכון מצב הטעינה והשגיאות
  useEffect(() => {
    const isCurrentlyLoading = selectedCategoryId !== null ? categoryProductsLoading : allProductsLoading;
    const currentError = selectedCategoryId !== null ? categoryProductsError : allProductsError;

    dispatch(setLoading(isCurrentlyLoading));
    if (currentError) {
      dispatch(setError('שגיאה בטעינת המוצרים'));
    }
  }, [allProductsLoading, categoryProductsLoading, allProductsError, categoryProductsError, selectedCategoryId, dispatch]);

  // פילטור וסידור המוצרים
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      default: return a.name.localeCompare(b.name);
    }
  });

  // מציאת שם הקטגוריה הנבחרת
  const selectedCategoryName = selectedCategoryId
    ? categories.find(cat => cat.Id === selectedCategoryId)?.Name || ''
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 font-hebrew">
      <Header />

      {/* Search & Filter Bar */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold rainbow-text mb-2">חנות המוצרים שלנו</h1>
            <p className="text-gray-600 text-lg">גלה את המוצרים הטובים ביותר במחירים מעולים</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
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
      </div>

      {/* Results and Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">טוען מוצרים...</p>
          </div>
        )}

        {!loading && (
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
    </div>
  );
};

export default ShoppingScreen;
