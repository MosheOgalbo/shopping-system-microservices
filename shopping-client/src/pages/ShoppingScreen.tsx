import { useAppDispatch, useAppSelector } from '../hooks';
import { setCategory } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { useState } from 'react';

const ShoppingScreen = () => {
  const dispatch = useAppDispatch();
  const { products, selectedCategory } = useAppSelector(state => state.products);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(p =>
    (selectedCategory ? p.category === selectedCategory : true) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="חפש מוצרים..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full md:w-1/2"
          />
          <select
            value={selectedCategory}
            onChange={e => dispatch(setCategory(e.target.value))}
            className="border p-2 rounded w-full md:w-1/4"
          >
            <option value="">כל הקטגוריות</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">לא נמצאו מוצרים.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingScreen;
