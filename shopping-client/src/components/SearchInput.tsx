import React, { useEffect, useId, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SearchInputProps } from '../types';

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  suggestions = [],
  onSelectSuggestion,
  suggestionsReady = true,
}) => {
  const { t } = useTranslation();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [suggestions, value]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const showList = open && suggestions.length > 0;

  const chooseSuggestion = (index: number) => {
    const suggestion = suggestions[index];
    if (!suggestion) return;
    onChange(suggestion.name);
    onSelectSuggestion?.(suggestion.id);
    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(index => Math.min(index + 1, Math.max(suggestions.length - 1, 0)));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex(index => Math.max(index - 1, 0));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (showList) {
        chooseSuggestion(activeIndex);
      }
    }
  };

  return (
    <div ref={rootRef} className="relative w-full flex-1">
      <Search
        className="pointer-events-none absolute end-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />

      <input
        type="search"
        role="combobox"
        placeholder={t('search.placeholder')}
        value={value}
        onChange={event => {
          onChange(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-xl border border-gray-200 bg-white py-3 ps-4 pe-10 text-gray-900 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
        aria-label={t('search.label')}
        aria-expanded={showList}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={showList ? `${listboxId}-option-${activeIndex}` : undefined}
        aria-describedby="search-help"
        autoComplete="off"
        spellCheck="false"
      />

      <div id="search-help" className="sr-only" aria-live="polite">
        {t('a11y.searchHelp')}
      </div>

      {showList && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={t('search.suggestionsLabel')}
          className="absolute start-0 end-0 z-30 mt-2 max-h-72 overflow-auto rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-600 dark:bg-slate-900"
        >
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <tr>
                <th scope="col" className="px-3 py-2 text-start font-semibold">{t('search.columnProduct')}</th>
                <th scope="col" className="px-3 py-2 text-start font-semibold">{t('search.columnCategory')}</th>
                <th scope="col" className="px-3 py-2 text-start font-semibold">{t('search.columnPrice')}</th>
              </tr>
            </thead>
            <tbody>
              {suggestions.map((suggestion, index) => {
                const active = index === activeIndex;
                return (
                  <tr
                    key={suggestion.id}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={active}
                    className={`cursor-pointer border-t border-slate-100 dark:border-slate-700 ${
                      active
                        ? 'bg-emerald-50 dark:bg-emerald-950'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={event => {
                      event.preventDefault();
                      chooseSuggestion(index);
                    }}
                  >
                    <td className="break-words px-3 py-2 font-medium text-slate-900 dark:text-slate-50">{suggestion.name}</td>
                    <td className="break-words px-3 py-2 text-slate-600 dark:text-slate-300">{suggestion.category}</td>
                    <td className="px-3 py-2 font-semibold text-emerald-800 dark:text-emerald-300">
                      ₪{suggestion.price.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {open && suggestionsReady && suggestions.length === 0 && (
        <div
          className="absolute start-0 end-0 z-30 mt-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-lg dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300"
          role="status"
        >
          {t('search.noSuggestions')}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
