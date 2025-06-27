import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { removeItem, updateQuantity } from '../../store/slices/cartSlice';
import Button from '../common/Button';
import { APP_CONFIG, UI_MESSAGES } from '../../utils/constants';

const CartList = ({ onContinueToOrder }) => {
  const dispatch = useDispatch();
  const { items, totalItems, totalQuantity } = useSelector(state => state.cart);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity >= APP_CONFIG.MIN_QUANTITY && newQuantity <= APP_CONFIG.MAX_QUANTITY) {
      dispatch(updateQuantity({ itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    if (window.confirm('האם אתה בטוח שברצונך להסיר את הפריט?')) {
      dispatch(removeItem(itemId));
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary-600" />
          עגלת קניות
        </h2>
        <div className="text-sm text-gray-600">
          {totalItems} פריטים • {totalQuantity} יחידות
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">{UI_MESSAGES.EMPTY_CART}</p>
          <p className="text-gray-400 text-sm mt-2">
            הוסף מוצרים כדי להתחיל בקנייה
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.categoryName}</p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                  title="הסר פריט"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={item.quantity <= APP_CONFIG.MIN_QUANTITY}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 py-1 bg-gray-100 rounded min-w-[3rem] text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={item.quantity >= APP_CONFIG.MAX_QUANTITY}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-sm text-gray-600">
                  {item.quantity} יח'
                </div>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">סה"כ:</span>
              <span className="font-semibold text-lg text-primary-600">
                {totalQuantity} יחידות
              </span>
            </div>

            <Button
              onClick={onContinueToOrder}
              variant="secondary"
              size="lg"
              className="w-full"
            >
              המשך להזמנה
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartList;
