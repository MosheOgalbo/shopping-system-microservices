import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../store/slices/cartSlice';
import { PropsProductCard } from '../types';
import { isImageUrl } from '../util/products';

const ProductCard: React.FC<PropsProductCard> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 bg-slate-100">
        {isImageUrl(product.image) ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl" aria-hidden="true">
            {product.image || '📦'}
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-slate-900 shadow">
          ₪{product.price.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 text-right">
        <div className="mb-4">
          {product.category && (
            <p className="mb-2 text-xs font-semibold tracking-wide text-emerald-700">{product.category}</p>
          )}
          <h2 className="text-lg font-bold text-slate-900">{product.name}</h2>
          {product.description && (
            <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
          )}
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="text-sm font-medium text-slate-600">כמות</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={`הקטן כמות של ${product.name}`}
                className="h-8 w-8 rounded-full border border-slate-300 bg-white text-lg leading-none text-slate-800"
                onClick={() => setQuantity(value => Math.max(1, value - 1))}
              >
                −
              </button>
              <span className="min-w-6 text-center font-semibold text-slate-900" aria-live="polite">{quantity}</span>
              <button
                type="button"
                aria-label={`הגדל כמות של ${product.name}`}
                className="h-8 w-8 rounded-full border border-slate-300 bg-white text-lg leading-none text-slate-800"
                onClick={() => setQuantity(value => Math.min(99, value + 1))}
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800"
            aria-label={`הוסף מוצר לסל: ${product.name}`}
          >
            {added ? 'נוסף לסל' : 'הוסף מוצר לסל'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
