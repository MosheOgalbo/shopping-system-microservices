import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../store/slices/cartSlice';
import { PropsProductCard } from '../types';

/**
 * קומפוננטה להצגת כרטיס מוצר
 * מציגה פרטי מוצר ומאפשרת הוספה לעגלת קניות
 * @param product - אובייקט המוצר שיוצג
 */
const ProductCard: React.FC<PropsProductCard> = ({ product }) => {
  // Redux dispatch hook לשליחת actions
  const dispatch = useAppDispatch();

  // מצב מקומי לטיפול בטעינה בעת הוספה לעגלה
  const [isAdding, setIsAdding] = useState<boolean>(false);

  /**
   * פונקציה לטיפול בלחיצה על כפתור "הוסף לעגלה"
   * מוסיפה את המוצר לעגלת הקניות עם אפקט טעינה
   */
  const handleAddToCart = async (): Promise<void> => {
    try {
      setIsAdding(true);

      // שליחת action להוספת מוצר לעגלה
      dispatch(addToCart(product));

      // השהיה קצרה לחוויית משתמש טובה יותר
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error('Error adding product to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  /**
   * פונקציה לבדיקה אם התמונה היא URL תקין או אייקון
   * @param image - מחרוזת התמונה לבדיקה
   * @returns האם המחרוזת היא URL תקין
   */
  const isImageUrl = (image: string | undefined): boolean => {
    if (!image) return false;

    return image.startsWith('http') || image.startsWith('data:');
  };

  /**
   * פונקציה לטיפול בשגיאות טעינת תמונה
   * מחליפה תמונה שנכשלה באייקון ברירת מחדל
   */
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    const target = e.target as HTMLImageElement;
    const fallbackIcon = target.nextElementSibling as HTMLElement;

    // הסתרת התמונה הכושלת
    target.style.display = 'none';

    // הצגת אייקון ברירת המחדל
    if (fallbackIcon) {
      fallbackIcon.classList.remove('hidden');
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">

      {/* אזור התמונה/אייקון של המוצר */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">

        {/* הצגת תמונה אם זה URL תקין */}
        {isImageUrl(product.image) ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          // הצגת אייקון אם זה לא URL
          <div className="text-6xl group-hover:scale-125 transition-transform duration-300 filter group-hover:drop-shadow-lg">
            {product.image || '📦'}
          </div>
        )}

        {/* אייקון גיבוי - מוסתר כברירת מחדל */}
        {isImageUrl(product.image) && (
          <div className="hidden text-6xl group-hover:scale-125 transition-transform duration-300 filter group-hover:drop-shadow-lg">
            📦
          </div>
        )}

        {/* תג מחיר */}
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
          ₪{product.price.toFixed(2)}
        </div>
      </div>

      {/* אזור פרטי המוצר */}
      <div className="p-6">

        {/* כותרת ותיאור המוצר */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h2>

          {/* תיאור המוצר (אופציונלי) */}
          {product.description && (
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* תג קטגוריה */}
        <div className="mb-4">
          {product.category && (
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
              {product.category}
            </span>
          )}
        </div>

        {/* כפתור הוספה לעגלה */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
            isAdding
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
          }`}
          aria-label={isAdding ? 'מוסיף מוצר לעגלה' : `הוסף ${product.name} לעגלה`}
        >
          {isAdding ? (
            // מצב טעינה
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              מוסיף לעגלה...
            </div>
          ) : (
            // מצב רגיל
            <div className="flex items-center justify-center">
              <span className="mr-2">🛒</span>
              הוסף לעגלה
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
