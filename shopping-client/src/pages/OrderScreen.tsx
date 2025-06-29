import { useAppSelector, useAppDispatch } from '../hooks';
import { clearCart } from '../features/cart/cartSlice';
import Header from '../components/Header';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {
      firstName: form.firstName ? '' : 'שם פרטי נדרש',
      lastName: form.lastName ? '' : 'שם משפחה נדרש',
      address: form.address ? '' : 'כתובת נדרשת',
      email: form.email && /\S+@\S+\.\S+/.test(form.email) ? '' : 'מייל תקין נדרש',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:8900/api/orders', {
        ...form,
        items: cartItems,
      });
      dispatch(clearCart());
      alert('ההזמנה נשלחה בהצלחה!');
      setForm({ firstName: '', lastName: '', address: '', email: '' });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('שגיאה בשליחת ההזמנה. אנא נסה שוב.');
    }
  };

  return (
    <div>
      <Header />
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">פרטי הזמנה</h2>
        <div className="space-y-4">
          <div>
            <input
              name="firstName"
              placeholder="שם פרטי"
              value={form.firstName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div>
            <input
              name="lastName"
              placeholder="שם משפחה"
              value={form.lastName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
          <div>
            <input
              name="address"
              placeholder="כתובת"
              value={form.address}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div>
            <input
              name="email"
              placeholder="מייל"
              value={form.email}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        </div>

        <h3 className="font-bold mb-2 mt-4">מוצרים בהזמנה:</h3>
        {cartItems.length > 0 ? (
          <ul className="mb-4">
            {cartItems.map(item => (
              <li key={item.id}>{item.name} x {item.quantity}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">העגלה ריקה.</p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
          disabled={cartItems.length === 0}
        >
          אשר הזמנה
        </button>
      </div>
    </div>
  );
};

export default OrderScreen;
