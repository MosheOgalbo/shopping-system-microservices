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
        : 'bg-emerald-700 hover:bg-emerald-800 shadow-sm'
    }`}
  >
    {isSubmitting ? 'שולח...' : 'אשר הזמנה'}
  </button>
);

export default SubmitButton;
