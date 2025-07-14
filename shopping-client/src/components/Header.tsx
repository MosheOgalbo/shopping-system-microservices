import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { toggleCart } from '../store/slices/cartSlice';
import {  ROUTES_Header, TEXTS_Header } from '../util/constants';


/**
 * רכיב Header - כותרת האפליקציה עם ניווט וסל קניות
 * מציג לוגו, ניווט, מידע על העגלה וכפתור לעגלה
 */
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // נתוני העגלה מה-Redux store
  const cartItems = useAppSelector(state => state.cart.items);

  // חישוב נתונים נגזרים
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // בדיקת עמוד נוכחי
  const isOrderPage = location.pathname === ROUTES_Header.ORDER;

  /**
   * מטפל בלחיצה על כפתור העגלה
   * מפעיל את המודל וניווט לעמוד ההזמנה
   */
  const handleCartClick = () => {
    dispatch(toggleCart());
    navigate(ROUTES_Header.ORDER);
  };

  /**
   * מחזיר את המחלקות CSS לכפתורי הניווט
   */
  const getNavButtonClasses = (isActive: boolean, activeColor: string, hoverColor: string) => {
    return `px-4 py-2 rounded-lg transition-all duration-300 ${
      isActive
        ? `bg-${activeColor}-500 text-white shadow-lg`
        : `text-gray-600 hover:text-${hoverColor}-600 hover:bg-${hoverColor}-50`
    }`;
  };

  return (
    <header className="w-full bg-gray-800 text-white py-4 px-6 text-center text-xl font-bold shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* לוגו */}
          <Link
            to={ROUTES_Header.SHOPPING}
            className="flex items-center space-x-2 rtl:space-x-reverse group"
            aria-label="חזרה לעמוד הקניות"
          >
            <div className="text-3xl animate-float">🛒</div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-blue-700 transition-all duration-300">
                {TEXTS_Header.LOGO}
              </h1>
              <span className="text-xs text-gray-500">{TEXTS_Header.SUBTITLE}</span>
            </div>
          </Link>

          {/* ניווט למסכים גדולים */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link
              to={ROUTES_Header.SHOPPING}
              className={getNavButtonClasses(!isOrderPage, 'blue', 'blue')}
            >
              {TEXTS_Header.SHOPPING}
            </Link>
            <Link
              to={ROUTES_Header.ORDER}
              className={getNavButtonClasses(isOrderPage, 'green', 'green')}
            >
              {TEXTS_Header.ORDER}
            </Link>
          </nav>

          {/* כפתור עגלה ומידע */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={handleCartClick}
              className="relative p-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 animate-pulse-ring"
              aria-label={`עגלת קניות - ${cartCount} פריטים`}
            >
              <div className="text-2xl">🛒</div>
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-bounce">
                  {cartCount}
                </div>
              )}
            </button>

            {/* מידע על העגלה */}
            {cartCount > 0 && (
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-700">
                  {cartCount} {TEXTS_Header.ITEMS}
                </span>
                <span className="text-lg font-bold text-green-600">
                  ₪{totalPrice.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ניווט למסכים קטנים */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="flex">
          <Link
            to={ROUTES_Header.SHOPPING}
            className={`flex-1 py-3 text-center transition-all duration-300 ${
              !isOrderPage
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-blue-50'
            }`}
          >
            {TEXTS_Header.SHOPPING}
          </Link>
          <Link
            to={ROUTES_Header.ORDER}
            className={`flex-1 py-3 text-center transition-all duration-300 ${
              isOrderPage
                ? 'bg-green-500 text-white'
                : 'text-gray-600 hover:bg-green-50'
            }`}
          >
            {TEXTS_Header.ORDER}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
