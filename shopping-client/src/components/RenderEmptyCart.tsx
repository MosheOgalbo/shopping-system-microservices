import React from 'react';
import { useTranslation } from 'react-i18next';

const RenderEmptyCart: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="py-8 text-center text-gray-500 dark:text-slate-400">
      <div className="mb-4 text-6xl text-emerald-500" aria-hidden="true">🛒</div>
      <p className="text-lg font-semibold dark:text-slate-200">{t('orderSummary.empty')}</p>
      <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">{t('orderSummary.emptySubtitle')}</p>
    </div>
  );
};

export default RenderEmptyCart;
