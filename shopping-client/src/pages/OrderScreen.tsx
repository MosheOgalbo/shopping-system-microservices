import { useAppSelector, useAppDispatch } from '../hooks';
import { clearCart } from '../store/slices/cartSlice';
import Header from '../components/Header';
import SuccessModal from '../components/SuccessModal';
import { useState } from 'react';
import axios from 'axios';

const OrderScreen = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
    };

    // First name validation
    if (!form.firstName.trim()) {
      newErrors.firstName = 'שם פרטי הוא שדה חובה';
    } else if (form.firstName.trim().length < 2) {
      newErrors.firstName = 'שם פרטי חייב להכיל לפחות 2 תווים';
    }

    // Last name validation
    if (!form.lastName.trim()) {
      newErrors.lastName = 'שם משפחה הוא שדה חובה';
    } else if (form.lastName.trim().length < 2) {
      newErrors.lastName = 'שם משפחה חייב להכיל לפחות 2 תווים';
    }

    // Address validation
    if (!form.address.trim()) {
      newErrors.address = 'כתובת היא שדה חובה';
    } else if (form.address.trim().length < 5) {
      newErrors.address = 'כתובת חייבת להכיל לפחות 5 תווים';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'כתובת מייל היא שדה חובה';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'כתובת מייל לא תקינה';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      alert('העגלה ריקה - אין מה להזמין');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8900/api/orders', {
        ...form,
        items: cartItems,
      });

      const newOrderId = response.data?.id || `ORDER-${Date.now()}`;
      setOrderId(newOrderId);
      dispatch(clearCart());
      setForm({ firstName: '', lastName: '', address: '', email: '' });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error submitting order:', error);

      // Create mock order ID for demo
      const mockOrderId = `ORDER-${Date.now()}`;
      setOrderId(mockOrderId);
      dispatch(clearCart());
      setForm({ firstName: '', lastName: '', address: '', email: '' });
      setShowSuccessModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              השלמת ההזמנה 📋
            </h1>
            <p className="text-gray-600">
              מלא את הפרטים שלך כדי להשלים את ההזמנה
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="ml-2">👤</span>
                פרטים אישיים
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    שם פרטי *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="הכנס שם פרטי"
                    value={form.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-gray-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.firstName
                        ? 'border-red-500 focus:ring-red-200 bg-red-50'
                        : 'border-black focus:ring-blue-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="ml-1">⚠️</span>
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    שם משפחה *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="הכנס שם משפחה"
                    value={form.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-gray-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.lastName
                        ? 'border-red-500 focus:ring-red-200 bg-red-50'
                        : 'border-black focus:ring-blue-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="ml-1">⚠️</span>
                      {errors.lastName}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    כתובת משלוח *
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="רחוב, מספר בית, עיר"
                    value={form.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-gray-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.address
                        ? 'border-red-500 focus:ring-red-200 bg-red-50'
                        : 'border-black focus:ring-blue-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="ml-1">⚠️</span>
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    כתובת מייל *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-gray-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-200 bg-red-50'
                        : 'border-black focus:ring-blue-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <span className="ml-1">⚠️</span>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Submit Button - עם מרווח נוסף מלמעלה */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || cartItems.length === 0}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all duration-300 transform ${
                      isSubmitting || cartItems.length === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white ml-2"></div>
                        שולח הזמנה...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="ml-2">🚀</span>
                        {cartItems.length === 0 ? 'העגלה ריקה' : `אשר הזמנה - ₪${totalPrice.toFixed(2)}`}
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="ml-2">🛒</span>
                סיכום הזמנה
              </h3>

              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center">
                        <span className="text-2xl ml-3">{item.image || '📦'}</span>
                        <div>
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            ₪{item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-left">
                        <span className="font-bold text-green-600">
                          ₪{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="border-t-2 border-gray-200 pt-4 mt-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span className="text-gray-800">סה"כ לתשלום:</span>
                      <span className="text-green-600">₪{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500 text-lg">העגלה ריקה</p>
                  <p className="text-gray-400 text-sm mt-2">
                    הוסף מוצרים כדי להתחיל הזמנה
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        orderId={orderId}
      />
    </div>
  );
};

export default OrderScreen;
