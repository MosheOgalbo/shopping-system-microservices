import React from 'react';
import { Filter, SortAsc } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { translateCatalogLabel } from '../i18n/catalog';
import { FilterBarProps } from '../types';

const SORT_OPTIONS = {
  NAME: 'name',
  PRICE_LOW: 'price-low',
  PRICE_HIGH: 'price-high'
} as const;

const ALL_CATEGORIES = 'all';

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategoryId,
  onCategoryChange,
  sortBy,
  onSortChange,
  categoriesLoading = false
}) => {
  const { t } = useTranslation();

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const categoryId = value === ALL_CATEGORIES ? null : parseInt(value, 10);
    onCategoryChange(categoryId);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  const selectStyles = `
    w-full ps-4 pe-10 py-3 border text-gray-900 border-gray-200 rounded-xl
    focus:ring-2 focus:ring-emerald-500 focus:border-transparent
    transition-all duration-300 appearance-none bg-white
    disabled:opacity-50 disabled:cursor-not-allowed
    dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100
  `;

  const iconStyles = 'pointer-events-none absolute end-3 top-1/2 w-5 h-5 -translate-y-1/2 text-gray-400 dark:text-slate-400';

  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-between gap-4 md:flex-row">
      <div className="relative w-full flex-1">
        <Filter className={iconStyles} aria-hidden="true" />
        <select
          value={selectedCategoryId || ALL_CATEGORIES}
          onChange={handleCategoryChange}
          disabled={categoriesLoading}
          className={selectStyles}
          aria-label={t('a11y.categorySelect')}
        >
          <option value={ALL_CATEGORIES}>{t('filter.allCategories')}</option>
          {categories.map(category => (
            <option key={category.Id} value={category.Id}>
              {category.icon && `${category.icon} `}
              {translateCatalogLabel(t, 'categories', category.Name)}
            </option>
          ))}
        </select>

        {categoriesLoading && (
          <div className="absolute start-8 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600" />
          </div>
        )}
      </div>

      <div className="relative w-full flex-1">
        <SortAsc className={iconStyles} aria-hidden="true" />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className={selectStyles}
          aria-label={t('a11y.sortSelect')}
        >
          <option value={SORT_OPTIONS.NAME}>{t('filter.sortByName')}</option>
          <option value={SORT_OPTIONS.PRICE_LOW}>{t('filter.sortPriceLow')}</option>
          <option value={SORT_OPTIONS.PRICE_HIGH}>{t('filter.sortPriceHigh')}</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
