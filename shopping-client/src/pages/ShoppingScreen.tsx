import { useAppDispatch, useAppSelector } from '../hooks';
import { setCategory } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import { useState } from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';




const ShoppingScreen = () => {
  const dispatch = useAppDispatch();
  const { products, selectedCategory } = useAppSelector(state => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['כל הקטגוריות', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p =>
    (!selectedCategory || p.category === selectedCategory) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 font-hebrew" dir="rtl">
      <Header />

      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">חנות המוצרים שלנו</h1>
            <p className="text-gray-600 text-lg">גלה את המוצרים הטובים ביותר במחירים מעולים</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
            <div className="flex-1 relative w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="חפש מוצרים..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="flex-1 relative w-full">
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => dispatch(setCategory(e.target.value))}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat === 'כל הקטגוריות' ? '' : cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 relative w-full">
              <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
              >
                <option value="name">מיין לפי שם</option>
                <option value="price-low">מחיר נמוך לגבוה</option>
                <option value="price-high">מחיר גבוה לנמוך</option>
                {/* <option value="rating">דירוג</option> */}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            נמצאו {sortedProducts.length} מוצרים
            {searchTerm && ` עבור "${searchTerm}"`}
            {selectedCategory && selectedCategory !== 'כל הקטגוריות' && ` בקטגוריה "${selectedCategory}"`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="text-center py-12 col-span-full">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">לא נמצאו מוצרים</h3>
              <p className="text-gray-500">נסה לשנות את מונחי החיפוש או הסנן</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingScreen;
