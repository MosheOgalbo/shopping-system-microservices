import React, { useState } from 'react';

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
};

type FormErrors = Record<keyof FormData, string>;

interface OrderFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, isSubmitting }) => {
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof FormData; value: string };
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = { firstName: '', lastName: '', address: '', email: '' };
    if (!form.firstName.trim() || form.firstName.trim().length < 2) {
      newErrors.firstName = !form.firstName.trim() ? 'שם פרטי הוא שדה חובה' : 'לפחות 2 תווים';
    }
    if (!form.lastName.trim() || form.lastName.trim().length < 2) {
      newErrors.lastName = !form.lastName.trim() ? 'שם משפחה הוא שדה חובה' : 'לפחות 2 תווים';
    }
    if (!form.address.trim() || form.address.trim().length < 5) {
      newErrors.address = !form.address.trim() ? 'כתובת היא שדה חובה' : 'לפחות 5 תווים';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email)) {
      newErrors.email = !form.email.trim() ? 'מייל הוא שדה חובה' : 'מייל לא תקין';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(err => !err);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const renderField = (name: keyof FormData, label: string, placeholder: string, type = 'text') => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label} *</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
        className={`w-full px-4 py-3 text-gray-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
          errors[name]
            ? 'border-red-500 focus:ring-red-200 bg-red-50'
            : 'border-black focus:ring-blue-200'
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <span className="ml-1">⚠️</span> {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-xl p-6 h-fit">
      <h2 className="  text-indigo-900 text-2xl font-bold mb-4 flex items-center">
        <span className="ml-2">👤</span> פרטים אישיים
      </h2>
      {renderField('firstName', 'שם פרטי', 'הכנס שם פרטי')}
      {renderField('lastName', 'שם משפחה', 'הכנס שם משפחה')}
      {renderField('address', 'כתובת משלוח', 'רחוב, מספר בית, עיר')}
      {renderField('email', 'כתובת מייל', 'example@email.com', 'email')}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-xl font-bold text-white text-lg transition transform ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 shadow-lg'
        }`}
      >
        {isSubmitting ? 'שולח...' : 'אשר הזמנה'}
      </button>
    </form>
  );
};

export default OrderForm;
