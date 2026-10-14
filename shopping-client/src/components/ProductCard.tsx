import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../hooks';
import { translateCatalogLabel } from '../i18n/catalog';
import { addToCart } from '../store/slices/cartSlice';
import { PropsProductCard } from '../types';
import { isImageUrl } from '../util/products';

const ProductCard: React.FC<PropsProductCard> = ({ product }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const displayName = translateCatalogLabel(t, 'names', product.name);
  const displayCategory = translateCatalogLabel(t, 'categories', product.category);
  const displayDescription = translateCatalogLabel(t, 'descriptions', product.description);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article
      id={`product-${product.id}`}
      data-product-id={product.id}
      className="flex h-full min-h-[26rem] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:shadow-none dark:hover:shadow-emerald-950/40"
    >
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800">
        {isImageUrl(product.image) ? (
          <img
            src={product.image}
            alt={displayName}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl" aria-hidden="true">
            {product.image || '📦'}
          </div>
        )}
        <span className="absolute start-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-slate-900 shadow dark:bg-slate-950/90 dark:text-emerald-300">
          ₪{product.price.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 text-start">
        <div className="min-h-[6.5rem]">
          {displayCategory && (
            <p className="mb-2 line-clamp-1 text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-400">
              {displayCategory}
            </p>
          )}
          <h2 className="line-clamp-2 break-words text-lg font-bold leading-snug text-slate-900 dark:text-slate-50">
            {displayName}
          </h2>
          {displayDescription && (
            <p className="mt-2 line-clamp-2 break-words text-sm leading-6 text-slate-600 dark:text-slate-300">
              {displayDescription}
            </p>
          )}
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-600 dark:bg-slate-800">
            <span className="shrink-0 text-sm font-medium text-slate-600 dark:text-slate-300">
              {t('products.quantity')}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={t('a11y.decreaseQty', { name: displayName })}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-lg leading-none text-slate-800 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100"
                onClick={() => setQuantity(value => Math.max(1, value - 1))}
              >
                −
              </button>
              <span
                className="min-w-6 text-center font-semibold text-slate-900 dark:text-slate-50"
                aria-live="polite"
              >
                {quantity}
              </span>
              <button
                type="button"
                aria-label={t('a11y.increaseQty', { name: displayName })}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-lg leading-none text-slate-800 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-100"
                onClick={() => setQuantity(value => Math.min(99, value + 1))}
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            aria-label={t('a11y.addToCart', { name: displayName })}
          >
            {added ? t('products.added') : t('products.addToCart')}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
