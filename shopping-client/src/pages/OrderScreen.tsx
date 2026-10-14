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
  const [placeOrder, { isLoading: isSubmitting }] = usePlaceOrderMutation();
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
      const result = await placeOrder({ user: formData, items: cartItems }).unwrap();
      if (!result.id) {
        setError('השרת לא אישר את שמירת ההזמנה');
        return;
      }
      setOrderId(result.id);
      // ניקוי העגלה
      dispatch(clearCart());
      // הצגת מודל ההצלחה
      setShowSuccess(true);
    } catch (err: unknown) {
      const data = typeof err === 'object' && err !== null && 'data' in err
        ? (err as { data?: { error?: string } }).data
        : undefined;
      setError(data?.error || 'שגיאה בשליחת ההזמנה. ההזמנה לא נשמרה.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* כותרת העמוד */}
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-right">
          <p className="text-sm font-semibold text-emerald-700">סיכום ההזמנה</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950">השלמת ההזמנה</h1>
          <p className="mt-2 text-slate-600">מלאו שם, כתובת ומייל. רשימת המוצרים מהסל מוצגת לצד הטופס.</p>
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
