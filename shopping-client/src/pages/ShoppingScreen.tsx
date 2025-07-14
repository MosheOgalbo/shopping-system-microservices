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

/**
 * רכיב מסך הקניות הראשי
 * מטפל בהצגת מוצרים, חיפוש, סינון וסידור
 */
const ShoppingScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(s => s.products);

  const [searchTerm, setSearchTerm] = useState(''); // מילת חיפוש
  const [sortBy, setSortBy] = useState('name'); // קריטריון מיון
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); // קטגוריה נבחרת

  // קריאות API באמצעות RTK Query

  // טעינת רשימת קטגוריות
  const { data: categories = [], isLoading: categoriesLoading } = useGetCategoriesQuery();

  // טעינת כל המוצרים (רק כאשר לא נבחרה קטגוריה ספציפית)
  const { data: allProducts, error: allProductsError, isLoading: allProductsLoading } = useGetProductsQuery(undefined, {
    skip: selectedCategoryId !== null // דלג על הקריאה אם נבחרה קטגוריה ספציפית
  });

  // טעינת מוצרים לפי קטגוריה (רק כאשר נבחרה קטגוריה)
  const { data: categoryProducts, error: categoryProductsError, isLoading: categoryProductsLoading } = useGetProductsByCategoryQuery(selectedCategoryId!, {
    skip: selectedCategoryId === null // דלג על הקריאה אם לא נבחרה קטגוריה
  });

  // Effect לעדכון המוצרים ב-Redux Store
  useEffect(() => {
    // בחירת המוצרים הנכונים בהתאם לקטגוריה הנבחרת
    const currentProducts = selectedCategoryId !== null ? categoryProducts : allProducts;

    if (currentProducts) {
      // עדכון המוצרים ב-store
      dispatch(setBackendProducts(currentProducts));
    }
  }, [allProducts, categoryProducts, selectedCategoryId, dispatch]);

  useEffect(() => {
    // קביעת מצב הטעינה הנוכחי בהתאם לקטגוריה הנבחרת
    const isCurrentlyLoading = selectedCategoryId !== null ? categoryProductsLoading : allProductsLoading;
    const currentError = selectedCategoryId !== null ? categoryProductsError : allProductsError;
    // עדכון מצב הטעינה
    dispatch(setLoading(isCurrentlyLoading));
    // טיפול בשגיאות
    if (currentError) {
      dispatch(setError('שגיאה בטעינת המוצרים'));
    }
  }, [allProductsLoading, categoryProductsLoading, allProductsError, categoryProductsError, selectedCategoryId, dispatch]);

  const filtered = products.filter(p =>
    // חיפוש בשם המוצר
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // חיפוש בתיאור המוצר (אם קיים)
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // סידור המוצרים המסוננים לפי הקריטריון הנבחר
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price; // מחיר מהנמוך לגבוה
      case 'price-high':
        return b.price - a.price; // מחיר מהגבוה לנמוך
      default:
        return a.name.localeCompare(b.name); // מיון אלפביתי לפי שם
    }
  });

  // מציאת שם הקטגוריה הנבחרת להצגה
  const selectedCategoryName = selectedCategoryId
    ? categories.find(cat => cat.Id === selectedCategoryId)?.Name || ''
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 font-hebrew">
      {/* כותרת עליונה */}
      <Header />

      {/* אזור חיפוש וסינון */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* כותרת ראשית */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold rainbow-text mb-2">חנות המוצרים שלנו</h1>
            <p className="text-gray-600 text-lg">גלה את המוצרים הטובים ביותר במחירים מעולים</p>
          </div>

          {/* שורת חיפוש וסינון */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
            {/* שדה חיפוש */}
            <SearchInput value={searchTerm} onChange={setSearchTerm} />

            {/* פס סינון ומיון */}
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

      {/* אזור התוצאות ורשת המוצרים */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* מצב טעינה */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">טוען מוצרים...</p>
          </div>
        )}

        {/* תוצאות וגריד מוצרים */}
        {!loading && (
          <>
            {/* מידע על התוצאות */}
            <ResultsInfo
              count={sorted.length}
              searchTerm={searchTerm}
              category={selectedCategoryName}
            />

            {/* רשת המוצרים */}
            <ProductsGrid products={sorted} />
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingScreen;
