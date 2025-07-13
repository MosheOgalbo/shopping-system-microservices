import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { toggleCart } from '../store/slices/cartSlice';


const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useAppSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const isOrderPage = location.pathname === '/order';

  // Function to handle cart icon click
  const handleCartClick = () => {
    dispatch(toggleCart());
    navigate('/order');
  };

  return (
    <header className="w-full bg-gray-800 text-white py-4 px-6 text-center text-xl font-bold shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/shopping" className="flex items-center space-x-2 rtl:space-x-reverse group">
            <div className="text-3xl animate-float">🛒</div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-blue-700 transition-all duration-300">
                סופר מרקט
              </h1>
              <span className="text-xs text-gray-500">הזמנות אונליין</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link
              to="/shopping"
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                !isOrderPage
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              קניות
            </Link>
            <Link
              to="/order"
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                isOrderPage
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              הזמנה
            </Link>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={handleCartClick}
              className="relative p-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 animate-pulse-ring"
            >
              <div className="text-2xl">🛒</div>
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-bounce">
                  {cartCount}
                </div>
              )}
            </button>

            {/* Cart Info */}
            {cartCount > 0 && (
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-700">
                  {cartCount} פריטים
                </span>
                <span className="text-lg font-bold text-green-600">
                  ₪{totalPrice.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className=" border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="flex">
          <Link
            to="/shopping"
            className={`flex-1 py-3 text-center transition-all duration-300 ${
              !isOrderPage
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-blue-50'
            }`}
          >
            קניות
          </Link>
          <Link
            to="/order"
            className={`flex-1 py-3 text-center transition-all duration-300 ${
              isOrderPage
                ? 'bg-green-500 text-white'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            הזמנה
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
