import React from 'react';
import { CartItem } from '../../store/slices/cartSlice';

interface OrderSummaryProps {
  items: CartItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.productId} className="flex justify-between">
            <span>{item.name} (x{item.quantity})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderSummary;
