import React from 'react';
import { CartItem } from '../types/index';
import {TEXTS_OrderSummary} from '../util/constants';
import RenderEmptyCart from './RenderEmptyCart';
import RenderOrderItem from './RenderOrderItem';

export interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}
/**
 * רכיב OrderSummary - מציג סיכום הזמנה עם מוצרים וסכום כולל
 * @param items - רשימת מוצרים בעגלה
 * @param total - סכום כולל
 */
const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {

    return (
    <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
      <h3 className="text-indigo-900 text-2xl font-bold mb-4 flex items-center">
        <span className="ml-2">🛒</span> {TEXTS_OrderSummary.TITLE}
      </h3>

      {items.length > 0 ? (
        <div className="text-indigo-900 space-y-4">
          {/* רשימת המוצרים */}
          {items.map(item => (
            <RenderOrderItem key={item.id} item={item} />
          ))}

          {/* סכום כולל */}
          <div className="border-t-2 pt-4 mt-6 flex justify-between font-bold text-xl">
            <span>{TEXTS_OrderSummary.TOTAL}</span>
            <span className="text-amber-400">₪{total.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <RenderEmptyCart />
      )}
    </div>
  );
};

export default OrderSummary;
