import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, Mail, MapPin } from 'lucide-react';
import { updateCustomerInfo, submitOrderAsync } from '../../store/slices/orderSlice';
import { clearCart } from '../../store/slices/cartSlice';
import Button from '../../common/Button';
import { validateForm } from '../../utils/validation';
import { UI_MESSAGES } from '../../utils/constants';

const CustomerForm = ({ onNavigateToShopping }) => {
  const dispatch = useDispatch();
  const { customerInfo, submitting, error } = useSelector(state => state.order);
  const { items } = useSelector(state => state.cart);

  const handleInputChange = (field, value) => {
    dispatch(updateCustomerInfo({ [field]: value }));
  };

  const handleSubmitOrder = async () => {
    const validation = validateForm(customerInfo);
    if (!validation.isValid) {
      alert(validation.errors.join('\n'));
      return;
    }

    if (items.length === 0) {
      alert('העגלה ריקה');
      return;
    }

    const orderData = {
      user: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        address: customerInfo.address
      },
      items: items.map(item => ({
        productId: item.categoryId,
        name: item.name,
        quantity: item.quantity
      }))
    };

    try {
      await dispatch(submitOrderAsync(orderData)).unwrap();
      dispatch(clearCart());
    } catch (error) {
      console.error('Order submission error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-secondary-600" />
          פרטי הזמנה
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <User className="w-4 h-4 inline ml-1" />
              שם פרטי *
            </label>
            <input
              type="text"
              required
              value={customerInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors"
              placeholder="הזן שם פרטי"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <User className="w-4 h-4 inline ml-1" />
              שם משפחה *
            </label>
            <input
              type="text"
              required
              value={customerInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors"
              placeholder="הזן שם משפחה"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <Mail className="w-4 h-4 inline ml-1" />
              כתובת אימייל *
            </label>
            <input
              type="email"
              required
              value={customerInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors"
              placeholder="example@email.com"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <MapPin className="w-4 h-4 inline ml-1" />
              כתובת מלאה *
            </label>
            <input
              type="text"
              required
              value={customerInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-colors"
              placeholder="רחוב, מספר, עיר, מיקוד"
              disabled={submitting}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onNavigateToShopping}
          variant="outline"
          size="lg"
          className="flex-1"
          disabled={submitting}
        >
          חזור לעריכה
        </Button>

        <Button
          onClick={handleSubmitOrder}
          variant="secondary"
          size="lg"
          className="flex-1"
          disabled={submitting || items.length === 0}
          loading={submitting}
        >
          {submitting ? 'שולח הזמנה...' : 'אשר הזמנה'}
        </Button>
      </div>
    </div>
  );
};

export default CustomerForm;
import React, { useState } from 'react';
import { useOrder } from '../../hooks/useOrder';

interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

const CustomerForm: React.FC = () => {
  const { setCustomerInfo } = useOrder();
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setCustomerInfo({ ...formData, [name]: value });
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
      <form className="space-y-4">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
        />
      </form>
    </div>
  );
};

export default CustomerForm;
