import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../hooks';
import { clearCart } from '../store/slices/cartSlice';
import Header from '../components/Header';
import SuccessModal from '../components/SuccessModal';
import OrderForm from '../components/OrderForm';
import OrderSummary from '../components/OrderSummary';
import { usePlaceOrderMutation } from '../services/ordersApi';

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

const OrderScreen: React.FC = () => {
  const { t } = useTranslation();
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();
  const [placeOrder, { isLoading: isSubmitting }] = usePlaceOrderMutation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleFormSubmit = async (formData: FormData) => {
    setError(null);
    if (cartItems.length === 0) {
      setError(t('order.emptyCartAlert'));
      return;
    }

    try {
      const result = await placeOrder({ user: formData, items: cartItems }).unwrap();
      if (!result.id) {
        setError(t('order.serverRejected'));
        return;
      }
      setOrderId(result.id);
      dispatch(clearCart());
      setShowSuccess(true);
    } catch (err: unknown) {
      const data = typeof err === 'object' && err !== null && 'data' in err
        ? (err as { data?: { error?: string } }).data
        : undefined;
      setError(data?.error || t('order.submitError'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <Header />
      <main id="main-content" className="container mx-auto max-w-4xl px-4 py-8" tabIndex={-1}>
        <div className="mb-8 text-start">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{t('order.eyebrow')}</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950 dark:text-white">{t('order.title')}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{t('order.subtitle')}</p>
        </div>
        {error && (
          <div className="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-200" role="alert">
            {error}
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-2">
          <OrderForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
          <OrderSummary items={cartItems} total={totalPrice} />
        </div>
      </main>
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        orderId={orderId}
      />
    </div>
  );
};

export default OrderScreen;
