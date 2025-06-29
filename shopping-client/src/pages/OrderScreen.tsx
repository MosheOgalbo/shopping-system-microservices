import { useAppSelector, useAppDispatch } from '../hooks';
import { clearCart } from '../features/cart/cartSlice';
import Header from '../components/Header';
import { useState } from 'react';

const OrderScreen = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // כאן אפשר לשגר לשרת
    console.log('Form Data:', form, 'Cart Items:', cartItems);
    dispatch(clearCart());
    alert('ההזמנה נשלחה!');
  };

  return (
    <div>
      <Header />
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">פרטי הזמנה</h2>
        <input
          name="fullName"
          placeholder="שם מלא"
          value={form.fullName}
          onChange={handleChange}
          className="border p-2 rounded mb-2 w-full"
          required
        />
        <input
          name="address"
          placeholder="כתובת"
          value={form.address}
          onChange={handleChange}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          name="email"
          placeholder="מייל"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
        />

        <h3 className="font-bold mb-2">מוצרים בהזמנה:</h3>
        <ul className="mb-4">
          {cartItems.map(item => (
            <li key={item.id}>{item.name} x {item.quantity}</li>
          ))}
        </ul>

        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          אשר הזמנה
        </button>
      </div>
    </div>
  );
};

export default OrderScreen;
