import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../features/products/types';

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {products.length > 0 ? (
      products.map(p => <ProductCard key={p.id} product={p} />)
    ) : (
      <div className="text-center py-12 col-span-full">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">לא נמצאו מוצרים</h3>
        <p className="text-gray-500">נסה לשנות את מונחי החיפוש או הסנן</p>
      </div>
    )}
  </div>
);

export default ProductsGrid;
