import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { clearCart } from '../store/slices/cartSlice';
import Header from '../components/Header';
import SuccessModal from '../components/SuccessModal';
import OrderForm from '../components/OrderForm';
import OrderSummary from '../components/OrderSummary';
import { usePlaceOrderMutation } from '../services/ordersApi';

// ממשק עבור נתוני טופס ההזמנה
interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

// קומפוננטת מסך ההזמנה
const OrderScreen: React.FC = () => {
  // בחירת פריטי העגלה מהסטור
  const cartItems = useAppSelector(state => state.cart.items);

  const dispatch = useAppDispatch();
  // שימוש במוטציה להגשת הזמנה
  const [placeOrder, { isLoading: isSubmitting, error: mutationError }] = usePlaceOrderMutation();
  // מצב מקומי להצגת מודל ההצלחה
  const [showSuccess, setShowSuccess] = useState(false);
  // מצב מקומי לשמירת מזהה ההזמנה
  const [orderId, setOrderId] = useState<string>('');
  // מצב מקומי לשמירת שגיאות
  const [error, setError] = useState<string | null>(null);

  // חישוב הסכום הכולל של ההזמנה
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // טיפול בהגשת טופס ההזמנה
  const handleFormSubmit = async (formData: FormData) => {
    // בדיקה אם העגלה ריקה
    if (cartItems.length === 0) {
      alert('העגלה ריקה - אין מה להזמין');
      return;
    }

    try {
      // שליחת בקשה להזמנה לשרת
      console.log('Sending payload:', JSON.stringify({ user: formData, items: cartItems }, null, 2));
      const result = await placeOrder({ user: formData, items: cartItems }).unwrap();
      // שמירת מזהה ההזמנה
      setOrderId(result.id);
      // ניקוי העגלה
      dispatch(clearCart());
      // הצגת מודל ההצלחה
      setShowSuccess(true);
    } catch (err: any) {
      // טיפול בשגיאות
      console.error('Error details:', err);
      setError(`שגיאה בשליחת ההזמנה: ${err.data?.error || err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* כותרת העמוד */}
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="rainbow-text text-4xl font-bold mb-2">השלמת ההזמנה</h1>
          <p className="text-gray-600">מלא את הפרטים שלך כדי להשלים את ההזמנה</p>
        </div>
        {/* הצגת הודעת שגיאה במידה וקיימת */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        {/* גריד המכיל את טופס ההזמנה וסיכום ההזמנה */}
        <div className="grid md:grid-cols-2 gap-8">
          <OrderForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
          <OrderSummary items={cartItems} total={totalPrice} />
        </div>
      </div>
      {/* מודל הצלחת הזמנה */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        orderId={orderId}
      />
    </div>
  );
};

export default OrderScreen;
