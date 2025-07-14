import React from 'react';
import {FormFieldProps } from '../types';

// קומפוננטת שדה טופס עבור הזמנה
const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  value,
  error,
  onChange,
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
      {label} *
    </label>
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 text-gray-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
        error ? 'border-red-500 focus:ring-red-200 bg-red-50' : 'border-black focus:ring-blue-200'
      }`}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && (
      <p id={`${name}-error`} className="text-red-500 text-sm mt-1 flex items-center" role="alert">
        <span className="ml-1">⚠️</span> {error}
      </p>
    )}
  </div>
);

export default FormField;
