import React from 'react';
import { CartItem } from '../store/slices/cartSlice'; // או ה־type המתאים

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => (
  <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
    <h3 className="  text-indigo-900 text-2xl font-bold mb-4 flex items-center">
      <span className=" ml-2">🛒</span> סיכום הזמנה
    </h3>
    {items.length > 0 ? (
      <div className=" text-indigo-900 space-y-4">
        {items.map(item => (
          <div
            key={item.id}
            className="flex justify-between items-center py-3 border-b last:border-b-0"
          >
            <div className="flex items-center">
              <span className="text-2xl ml-3">{item.image || '📦'}</span>
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm">
                  ₪{item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
            </div>
            <span className="font-bold  text-red-400">
              ₪{(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t-2 pt-4 mt-6 flex justify-between font-bold text-xl">
          <span>סה"כ לתשלום:</span>
          <span className="text-amber-400">₪{total.toFixed(2)}</span>
        </div>
      </div>
    ) : (
      <div className="text-center py-8 text-gray-500">
        <div className=" text-blue-400 text-6xl mb-4">🛒</div>
        <p>העגלה ריקה</p>
        <p className=" text-gray-600 text-sm mt-2">הוסף מוצרים כדי להתחיל הזמנה</p>
      </div>
    )}
  </div>
);

export default OrderSummary;
