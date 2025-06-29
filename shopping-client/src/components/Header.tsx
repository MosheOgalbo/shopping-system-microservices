import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const Header = () => {
  const cartCount = useAppSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">חנות לדוגמה</h1>
      <Link to="/order" className="relative">
        🛒
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default Header;
