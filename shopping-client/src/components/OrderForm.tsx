import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VALIDATION_RULES } from '../util/constants';
import FormField from './FormField';
import FormHeader from './FormHeader';
import SubmitButton from './SubmitButton';
import { FormData, FormErrors, OrderFormProps } from '../types';

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, isSubmitting }) => {
  const { t } = useTranslation();
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
      newErrors.firstName = t('form.errors.firstNameRequired');
    } else if (form.firstName.trim().length < VALIDATION_RULES.MIN_NAME_LENGTH) {
      newErrors.firstName = t('form.errors.minLength', {
        min: VALIDATION_RULES.MIN_NAME_LENGTH,
      });
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = t('form.errors.lastNameRequired');
    } else if (form.lastName.trim().length < VALIDATION_RULES.MIN_NAME_LENGTH) {
      newErrors.lastName = t('form.errors.minLength', {
        min: VALIDATION_RULES.MIN_NAME_LENGTH,
      });
    }

    if (!form.address.trim()) {
      newErrors.address = t('form.errors.addressRequired');
    } else if (form.address.trim().length < VALIDATION_RULES.MIN_ADDRESS_LENGTH) {
      newErrors.address = t('form.errors.minLength', {
        min: VALIDATION_RULES.MIN_ADDRESS_LENGTH,
      });
    }

    if (!form.email.trim()) {
      newErrors.email = t('form.errors.emailRequired');
    } else if (!VALIDATION_RULES.EMAIL_REGEX.test(form.email)) {
      newErrors.email = t('form.errors.invalidEmail');
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
    <form onSubmit={handleSubmit} className="h-fit space-y-6 rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-700">
      <FormHeader />
      <FormField
        name="firstName"
        label={t('form.firstName')}
        placeholder={t('form.firstNamePlaceholder')}
        value={form.firstName}
        error={errors.firstName}
        onChange={handleChange}
      />
      <FormField
        name="lastName"
        label={t('form.lastName')}
        placeholder={t('form.lastNamePlaceholder')}
        value={form.lastName}
        error={errors.lastName}
        onChange={handleChange}
      />
      <FormField
        name="address"
        label={t('form.address')}
        placeholder={t('form.addressPlaceholder')}
        value={form.address}
        error={errors.address}
        onChange={handleChange}
      />
      <FormField
        name="email"
        label={t('form.email')}
        placeholder={t('form.emailPlaceholder')}
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
