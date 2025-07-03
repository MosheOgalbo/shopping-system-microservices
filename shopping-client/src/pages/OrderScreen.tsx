import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { clearCart } from '../store/slices/cartSlice';
import Header from '../components/Header';
import SuccessModal from '../components/SuccessModal';
import OrderForm from '../components/OrderForm';
import OrderSummary from '../components/OrderSummary';
import { usePlaceOrderMutation } from '../services/ordersApi';

const OrderScreen: React.FC = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();
  const [placeOrder, { isLoading: isSubmitting, error: mutationError }] = usePlaceOrderMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleFormSubmit = async (formData: {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
  }) => {
    if (cartItems.length === 0) {
      alert('העגלה ריקה - אין מה להזמין');
      return;
    }
    try {
      console.log('Sending payload:', JSON.stringify({ user: formData, items: cartItems }, null, 2));
      const result = await placeOrder({ user: formData, items: cartItems }).unwrap();
      setOrderId(result.id);
      dispatch(clearCart());
      setShowSuccess(true);
    } catch (err: any) {
      console.error('Error details:', err);
      setError(`שגיאה בשליחת ההזמנה: ${err.data?.error || err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="rainbow-text text-4xl font-bold mb-2">השלמת ההזמנה</h1>
          <p className="text-gray-600">מלא את הפרטים שלך כדי להשלים את ההזמנה</p>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-8">
          <OrderForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
          <OrderSummary items={cartItems} total={totalPrice} />
        </div>
      </div>
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        orderId={orderId}
      />
    </div>
  );
};

export default OrderScreen;
