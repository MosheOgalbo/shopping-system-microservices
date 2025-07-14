import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => (
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
);

export default SubmitButton;
