import { useAppDispatch, useAppSelector } from '../hooks';
import { setCategory } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

const ShoppingScreen = () => {
  const dispatch = useAppDispatch();
  const { products, selectedCategory } = useAppSelector(state => state.products);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div>
      <Header />
      <div className="p-4">
        <select
          value={selectedCategory}
          onChange={e => dispatch(setCategory(e.target.value))}
          className="border p-2 rounded mb-4"
        >
          <option value="">כל הקטגוריות</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingScreen;
