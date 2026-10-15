import React from 'react';
import { FormFieldProps } from '../types';

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  value,
  error,
  maxLength,
  autoComplete,
  onChange,
}) => (
  <div>
    <label htmlFor={name} className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-200">
      {label} *
    </label>
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      autoComplete={autoComplete}
      onChange={onChange}
      className={`w-full rounded-lg border-2 px-4 py-3 text-gray-700 transition duration-200 focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 ${
        error
          ? 'border-red-500 bg-red-50 focus:ring-red-200 dark:bg-rose-950'
          : 'border-slate-300 focus:ring-emerald-200 dark:border-slate-600'
      }`}
      aria-invalid={!!error}
      aria-required="true"
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && (
      <p id={`${name}-error`} className="mt-1 flex items-center text-sm text-red-500 dark:text-rose-300" role="alert">
        <span className="me-1" aria-hidden="true">⚠️</span> {error}
      </p>
    )}
  </div>
);

export default FormField;
