import React, { useState } from 'react';
import { Product } from '../features/products/types';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../store/slices/cartSlice';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    dispatch(addToCart(product));
    // Add a small delay for user feedback
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsAdding(false);
  };

  // פונקציה לבדיקה אם התמונה היא URL או אייקון
  const isImageUrl = (image: string | undefined): boolean => {
    return image?.startsWith('http') || image?.startsWith('data:') || false;
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
      {/* Product Image/Icon */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
        {isImageUrl(product.image) ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-300"
            onError={(e) => {
              // אם התמונה לא נטענת, החלף באייקון ברירת מחדל
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : (
          <div className="text-6xl group-hover:scale-125 transition-transform duration-300 filter group-hover:drop-shadow-lg">
            {product.image || '📦'}
          </div>
        )}

        {/* Fallback icon - hidden by default */}
        {isImageUrl(product.image) && (
          <div className="hidden text-6xl group-hover:scale-125 transition-transform duration-300 filter group-hover:drop-shadow-lg">
            📦
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
          ₪{product.price.toFixed(2)}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h2>
          {product.description && (
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Category Tag */}
        <div className="mb-4">
          {product.category && (
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
              {product.category}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
            isAdding
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
          }`}
        >
          {isAdding ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              מוסיף לעגלה...
            </div>
          ) : (
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
