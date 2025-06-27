import React from 'react';
import { Order } from '../../store/slices/orderSlice';

interface OrderSuccessProps {
  order: Order | null;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ order }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">Order Placed Successfully!</h2>
      <p>Order ID: {order?.id}</p>
      <p>Thank you for your purchase!</p>
    </div>
  );
};

export default OrderSuccess;
