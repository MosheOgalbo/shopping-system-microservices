import React from 'react';
import CustomerForm from './CustomerForm';
import OrderSummary from './OrderSummary';
import OrderSuccess from './OrderSuccess';
import { useOrder } from '../../hooks/useOrder';
import { useCart } from '../../hooks/useCart';

const OrderScreen: React.FC = () => {
  const { cartItems } = useCart();
  const { order, placeOrder, isLoading, error, isSuccess } = useOrder();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Checkout</h1>
      {isSuccess ? (
        <OrderSuccess order={order} />
      ) : (
        <>
          <CustomerForm />
          <OrderSummary items={cartItems} />
          <button
            onClick={() => placeOrder(cartItems)}
            disabled={isLoading}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {isLoading ? 'Processing...' : 'Place Order'}
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </>
      )}
    </div>
  );
};

export default OrderScreen;
