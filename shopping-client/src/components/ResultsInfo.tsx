import React from 'react';
import { useTranslation } from 'react-i18next';
import { translateCatalogLabel } from '../i18n/catalog';
import { ResultsInfoProps } from '../types';

const ResultsInfo: React.FC<ResultsInfoProps> = ({ count = 0, total, searchTerm, category }) => {
  const { t } = useTranslation();

  const getProductsText = (): string => {
    if (typeof total === 'number') return t('results.showing', { shown: count, total });
    if (count === 0) return t('results.none');
    if (count === 1) return t('results.one');
    return t('results.many', { count });
  };

  const summary = getProductsText();
  const translatedCategory = category
    ? translateCatalogLabel(t, 'categories', category)
    : '';

  return (
    <div className="mb-6">
      <p
        className="text-gray-600 dark:text-slate-300"
        role="status"
        aria-live="polite"
        aria-label={t('results.statusLabel', { summary })}
      >
        <span className="font-semibold text-emerald-700 dark:text-emerald-400">{summary}</span>
        {searchTerm ? (
          <span>
            {' '}
            {t('results.forTerm', { term: searchTerm })}
          </span>
        ) : null}
        {translatedCategory ? (
          <span>
            {' '}
            {t('results.inCategory', { category: translatedCategory })}
          </span>
        ) : null}
      </p>
    </div>
  );
};

export default ResultsInfo;
