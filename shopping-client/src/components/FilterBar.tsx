import React, { useEffect, useId, useRef, useState } from 'react';
import type { TFunction } from 'i18next';
import { Filter, SortAsc } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { translateCatalogLabel } from '../i18n/catalog';
import { FilterBarProps } from '../types';

const SORT_OPTIONS = {
  NAME: 'name',
  PRICE_LOW: 'price-low',
  PRICE_HIGH: 'price-high'
} as const;

function itemCountLabel(t: TFunction, count: number) {
  return count === 1 ? t('filter.itemsOne') : t('filter.itemsMany', { count });
}

interface CategoryRow {
  id: number | null;
  name: string;
  icon?: string;
  count: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategoryId,
  onCategoryChange,
  sortBy,
  onSortChange,
  categoriesLoading = false
}) => {
  const { t } = useTranslation();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = categories.reduce((sum, category) => sum + (category.productCount ?? 0), 0);
  const rows: CategoryRow[] = [
    { id: null, name: t('filter.allCategories'), count: total },
    ...categories.map(category => ({
      id: category.Id,
      name: translateCatalogLabel(t, 'categories', category.Name),
      icon: category.icon,
      count: category.productCount ?? 0,
    })),
  ];

  const selectedIndex = Math.max(0, rows.findIndex(row => row.id === selectedCategoryId));
  const selected = rows[selectedIndex];

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  const choose = (row: CategoryRow) => {
    onCategoryChange(row.id);
    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(index => Math.min(index + 1, rows.length - 1));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(index => Math.max(index - 1, 0));
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (open) {
        const row = rows[activeIndex];
        if (row) choose(row);
      } else {
        setActiveIndex(selectedIndex);
        setOpen(true);
      }
    }
  };

  const selectStyles = `
    w-full ps-4 pe-10 py-3 border text-gray-900 border-gray-200 rounded-xl
    focus:ring-2 focus:ring-emerald-500 focus:border-transparent
    transition-all duration-300 appearance-none bg-white text-start
    disabled:opacity-50 disabled:cursor-not-allowed
    dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100
  `;

  const iconStyles = 'pointer-events-none absolute end-3 top-1/2 w-5 h-5 -translate-y-1/2 text-gray-400 dark:text-slate-400';

  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-between gap-4 md:flex-row">
      <div ref={rootRef} className="relative w-full flex-1">
        <Filter className={iconStyles} aria-hidden="true" />
        <button
          type="button"
          role="combobox"
          className={selectStyles}
          aria-label={t('a11y.categorySelect')}
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={open ? `${listboxId}-option-${activeIndex}` : undefined}
          disabled={categoriesLoading}
          onClick={() => {
            setActiveIndex(selectedIndex);
            setOpen(value => !value);
          }}
          onKeyDown={handleKeyDown}
        >
          {selected?.icon ? `${selected.icon} ` : ''}
          {selected?.name}
        </button>

        {categoriesLoading && (
          <div className="absolute start-8 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600" />
          </div>
        )}

        {open && (
          <div
            id={listboxId}
            role="listbox"
            aria-label={t('filter.categoriesTable')}
            className="absolute start-0 end-0 z-30 mt-2 max-h-80 overflow-auto rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-600 dark:bg-slate-900"
          >
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <tr>
                  <th scope="col" className="px-3 py-2 text-start font-semibold">{t('search.columnCategory')}</th>
                  <th scope="col" className="px-3 py-2 text-start font-semibold">{t('filter.columnCount')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  const active = index === activeIndex;
                  const selectedRow = row.id === selectedCategoryId;
                  return (
                    <tr
                      key={row.id ?? 'all'}
                      id={`${listboxId}-option-${index}`}
                      role="option"
                      aria-selected={selectedRow}
                      className={`cursor-pointer border-t border-slate-100 dark:border-slate-700 ${
                        active || selectedRow
                          ? 'bg-emerald-50 dark:bg-emerald-950'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseDown={event => {
                        event.preventDefault();
                        choose(row);
                      }}
                    >
                      <td className="px-3 py-2">
                        <span className="inline-flex min-h-10 items-center rounded-xl border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50">
                          {row.icon ? `${row.icon} ` : ''}
                          {row.name}
                        </span>
                      </td>
                      <td className="px-3 py-2 font-semibold text-emerald-800 dark:text-emerald-300">
                        {itemCountLabel(t, row.count)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="relative w-full flex-1">
        <SortAsc className={iconStyles} aria-hidden="true" />
        <select
          value={sortBy}
          onChange={event => onSortChange(event.target.value)}
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
