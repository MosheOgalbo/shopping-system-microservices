import React from 'react';
import { useTranslation } from 'react-i18next';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  const { t } = useTranslation();

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full rounded-xl py-4 text-lg font-bold text-white transition transform ${
        isSubmitting
          ? 'cursor-not-allowed bg-gray-400'
          : 'bg-emerald-700 shadow-sm hover:bg-emerald-800'
      }`}
    >
      {isSubmitting ? t('form.submitting') : t('form.submit')}
    </button>
  );
};

export default SubmitButton;
