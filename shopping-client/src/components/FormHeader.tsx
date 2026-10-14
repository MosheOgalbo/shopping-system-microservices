import React from 'react';
import { useTranslation } from 'react-i18next';

const FormHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <h2 className="mb-4 flex items-center text-2xl font-bold text-slate-900 dark:text-white">
      <span className="me-2" aria-hidden="true">👤</span> {t('form.personalDetails')}
    </h2>
  );
};

export default FormHeader;
