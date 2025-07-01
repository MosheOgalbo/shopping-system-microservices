import React, { useState } from 'react';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../hooks';
import { clearCart } from '../store/slices/cartSlice';
import Header from '../components/Header';
import SuccessModal from '../components/SuccessModal';
import OrderForm from '../components/OrderForm';
import OrderSummary from '../components/OrderSummary';

const OrderScreen: React.FC = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);
    setError(null);               // מאפסים הודעות קודמות
    try {
      const res = await axios.post('http://localhost:8900/api/orders', {
        ...formData,
        items: cartItems,
      });
      setOrderId(res.data.id || `ORDER-${Date.now()}`);
      dispatch(clearCart());
      setShowSuccess(true);
    } catch (err) {
      console.error(err);

      setError('שגיאה בשליחת ההזמנה. אנא נסה/י שוב מאוחר יותר.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" >
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="rainbow-text text-4xl font-bold mb-2">השלמת ההזמנה</h1>
          <p className="text-gray-600">מלא את הפרטים שלך כדי להשלים את ההזמנה</p>
        </div>

        {/* הצגת הודעת שגיאה */}
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
