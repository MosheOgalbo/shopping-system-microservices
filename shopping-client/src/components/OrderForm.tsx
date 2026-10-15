import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VALIDATION_RULES } from '../util/constants';
import { customerIssues, FieldIssue, normalizeCustomer } from '../util/orderValidation';
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

  const messageFor = (field: keyof FormData, issue: FieldIssue): string => {
    if (issue === 'required') {
      return t(`form.errors.${field}Required`);
    }
    if (issue === 'tooShort') {
      const min = field === 'address' ? VALIDATION_RULES.MIN_ADDRESS_LENGTH : VALIDATION_RULES.MIN_NAME_LENGTH;
      return t('form.errors.minLength', { min });
    }
    if (issue === 'tooLong') {
      const max = field === 'address'
        ? VALIDATION_RULES.MAX_ADDRESS_LENGTH
        : field === 'email'
          ? VALIDATION_RULES.MAX_EMAIL_LENGTH
          : VALIDATION_RULES.MAX_NAME_LENGTH;
      return t('form.errors.maxLength', { max });
    }
    if (field === 'email') return t('form.errors.invalidEmail');
    if (field === 'address') return t('form.errors.invalidAddress');
    return t('form.errors.invalidName');
  };

  const validate = (): FormData | null => {
    const issues = customerIssues(form);
    const newErrors: FormErrors = {
      firstName: issues.firstName ? messageFor('firstName', issues.firstName) : '',
      lastName: issues.lastName ? messageFor('lastName', issues.lastName) : '',
      address: issues.address ? messageFor('address', issues.address) : '',
      email: issues.email ? messageFor('email', issues.email) : '',
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return null;
    return normalizeCustomer(form);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const customer = validate();
    if (!customer) return;
    onSubmit(customer);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="h-fit space-y-6 rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-700">
      <FormHeader />
      <FormField
        name="firstName"
        label={t('form.firstName')}
        placeholder={t('form.firstNamePlaceholder')}
        value={form.firstName}
        error={errors.firstName}
        maxLength={VALIDATION_RULES.MAX_NAME_LENGTH}
        autoComplete="given-name"
        onChange={handleChange}
      />
      <FormField
        name="lastName"
        label={t('form.lastName')}
        placeholder={t('form.lastNamePlaceholder')}
        value={form.lastName}
        error={errors.lastName}
        maxLength={VALIDATION_RULES.MAX_NAME_LENGTH}
        autoComplete="family-name"
        onChange={handleChange}
      />
      <FormField
        name="address"
        label={t('form.address')}
        placeholder={t('form.addressPlaceholder')}
        value={form.address}
        error={errors.address}
        maxLength={VALIDATION_RULES.MAX_ADDRESS_LENGTH}
        autoComplete="street-address"
        onChange={handleChange}
      />
      <FormField
        name="email"
        label={t('form.email')}
        placeholder={t('form.emailPlaceholder')}
        type="email"
        value={form.email}
        error={errors.email}
        maxLength={VALIDATION_RULES.MAX_EMAIL_LENGTH}
        autoComplete="email"
        onChange={handleChange}
      />
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
};

export default OrderForm;
