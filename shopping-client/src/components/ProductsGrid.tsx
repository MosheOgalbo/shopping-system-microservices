import React from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard';
import { ProductsGridProps } from '../types';

const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => {
  const { t } = useTranslation();

  if (products.length === 0) {
    return (
      <div className="col-span-full py-12 text-center">
        <div className="mb-4 text-6xl" role="img" aria-label={t('a11y.searchIcon')}>
          🔍
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-700 dark:text-slate-200">{t('products.emptyTitle')}</h3>
        <p className="text-gray-500 dark:text-slate-400">{t('products.emptyHint')}</p>
      </div>
    );
  }

  return (
    <div
      className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      role="list"
      aria-label={t('a11y.productsGrid')}
    >
      {products.map(product => (
        <div key={product.id} role="listitem" className="h-full min-w-0">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
