import React, { useState } from 'react';
import { VALIDATION_RULES, ERROR_MESSAGES } from '../util/constants';
import FormField from './FormField';
import FormHeader from './FormHeader';
import SubmitButton from './SubmitButton';
import { FormData, FormErrors, OrderFormProps } from '../types';

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as { name: keyof FormData; value: string };

    setForm(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
    };

    if (!form.firstName.trim()) {
      newErrors.firstName = ERROR_MESSAGES.FIRST_NAME_REQUIRED;
    } else if (form.firstName.trim().length < VALIDATION_RULES.MIN_NAME_LENGTH) {
      newErrors.firstName = ERROR_MESSAGES.MIN_LENGTH.replace(
        '{min}',
        VALIDATION_RULES.MIN_NAME_LENGTH.toString()
      );
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = ERROR_MESSAGES.LAST_NAME_REQUIRED;
    } else if (form.lastName.trim().length < VALIDATION_RULES.MIN_NAME_LENGTH) {
      newErrors.lastName = ERROR_MESSAGES.MIN_LENGTH.replace(
        '{min}',
        VALIDATION_RULES.MIN_NAME_LENGTH.toString()
      );
    }

    if (!form.address.trim()) {
      newErrors.address = ERROR_MESSAGES.ADDRESS_REQUIRED;
    } else if (form.address.trim().length < VALIDATION_RULES.MIN_ADDRESS_LENGTH) {
      newErrors.address = ERROR_MESSAGES.MIN_LENGTH.replace(
        '{min}',
        VALIDATION_RULES.MIN_ADDRESS_LENGTH.toString()
      );
    }

    if (!form.email.trim()) {
      newErrors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
    } else if (!VALIDATION_RULES.EMAIL_REGEX.test(form.email)) {
      newErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl shadow-xl p-6 h-fit">
      <FormHeader />
      <FormField
        name="firstName"
        label="שם פרטי"
        placeholder="הכנס שם פרטי"
        value={form.firstName}
        error={errors.firstName}
        onChange={handleChange}
      />
      <FormField
        name="lastName"
        label="שם משפחה"
        placeholder="הכנס שם משפחה"
        value={form.lastName}
        error={errors.lastName}
        onChange={handleChange}
      />
      <FormField
        name="address"
        label="כתובת משלוח"
        placeholder="רחוב, מספר בית, עיר"
        value={form.address}
        error={errors.address}
        onChange={handleChange}
      />
      <FormField
        name="email"
        label="כתובת מייל"
        placeholder="example@email.com"
        type="email"
        value={form.email}
        error={errors.email}
        onChange={handleChange}
      />
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
};

export default OrderForm;
