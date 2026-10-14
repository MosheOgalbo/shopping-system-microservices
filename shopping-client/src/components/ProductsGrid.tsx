import React from 'react';
import ProductCard from './ProductCard';
import { ProductsGridProps } from '../types';

/**
 * קומפוננטה להצגת רשת מוצרים
 * מציגה מוצרים בפריסה רספונסיבית או הודעת "לא נמצאו מוצרים"
 * @param products - מערך המוצרים להצגה
 */
const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {

  /**
   * פונקציה לרינדור הודעת "לא נמצאו מוצרים"
   * מציגה הודעה ידידותית כאשר המערך ריק
   */
  const renderEmptyState = (): React.ReactElement => (
    <div className="text-center py-12 col-span-full">
      {/* אייקון חיפוש */}
      <div className="text-6xl mb-4" role="img" aria-label="אייקון חיפוש">
        🔍
      </div>

      {/* כותרת הודעה */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        לא נמצאו מוצרים
      </h3>

      {/* הודעת עזרה */}
      <p className="text-gray-500">
        נסה לשנות את מונחי החיפוש או הסנן
      </p>
    </div>
  );

  /**
   * פונקציה לרינדור רשת המוצרים
   * יוצרת כרטיס מוצר עבור כל מוצר במערך
   */
  const renderProductsGrid = (): React.ReactElement[] => (
    products.map(product => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ))
  );

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="grid"
      aria-label="רשת מוצרים"
    >
      {/* בדיקה אם יש מוצרים להצגה */}
      {products.length > 0 ? (
        /* הצגת רשת המוצרים */
        renderProductsGrid()
      ) : (
        /* הצגת הודעת "לא נמצאו מוצרים" */
        renderEmptyState()
      )}
    </div>
  );
};

export default ProductsGrid;
