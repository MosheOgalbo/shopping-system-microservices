import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setBackendProducts, setCategory, setLoading, setError } from '../features/products/productsSlice';
import { useGetProductsQuery } from '../services/productsApi';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import FilterBar from '../components/FilterBar';
import ResultsInfo from '../components/ResultsInfo';
import ProductsGrid from '../components/ProductsGrid';

const ShoppingScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, selectedCategory, loading } = useAppSelector(s => s.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // טעינת נתונים מהבקאנד
  const { data: backendProducts, error, isLoading } = useGetProductsQuery();

  // עדכון המוצרים כשהנתונים מגיעים מהבקאנד
  useEffect(() => {
    if (backendProducts) {
      dispatch(setBackendProducts(backendProducts));
    }
  }, [backendProducts, dispatch]);

  // עדכון מצב הטעינה
  useEffect(() => {
    dispatch(setLoading(isLoading));
    if (error) {
      dispatch(setError('שגיאה בטעינת המוצרים'));
    }
  }, [isLoading, error, dispatch]);

  const categories = ['כל הקטגוריות', ...Array.from(new Set(products.map(p => p.category)))];

  const filtered = products.filter(p =>
    (!selectedCategory || p.category === selectedCategory) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      default: return a.name.localeCompare(b.name);
    }
  });

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
              selected={selectedCategory}
              onCategoryChange={cat => dispatch(setCategory(cat))}
              sortBy={sortBy}
              onSortChange={setSortBy}
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
              category={selectedCategory}
            />
            <ProductsGrid products={sorted} />
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingScreen;
