import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

import { ShoppingCart, Package } from 'lucide-react';
import { APP_CONFIG } from '../utils/constants';

const Header = () => {
  const { totalItems, totalQuantity } = useSelector((state: RootState) => state.cart);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 p-2 rounded-lg">
              <Package className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {APP_CONFIG.APP_NAME}
              </h1>
              <p className="text-sm text-gray-600">
                מערכת הזמנות מתקדמת
              </p>
            </div>
          </div>

          {totalItems > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-secondary-50 px-3 py-2 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-secondary-600" />
                <div className="text-sm">
                  <span className="font-semibold text-secondary-700">
                    {totalItems}
                  </span>
                  <span className="text-secondary-600 mr-1">
                    פריטים
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-medium">{totalQuantity}</span>
                <span className="mr-1">יחידות</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
