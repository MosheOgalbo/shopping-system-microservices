import React from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  LANGUAGE_SHORT_CODES,
  SUPPORTED_LANGUAGES,
  type AppLanguage,
} from '../i18n';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const current = (SUPPORTED_LANGUAGES.includes(i18n.language as AppLanguage)
    ? i18n.language
    : 'he') as AppLanguage;

  return (
    <div
      className="relative inline-flex h-10 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 text-slate-700 transition hover:bg-slate-50 focus-within:border-slate-300 focus-within:ring-1 focus-within:ring-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus-within:border-slate-500 dark:focus-within:ring-slate-500"
    >
      <Languages className="pointer-events-none h-4 w-4 shrink-0 text-slate-500 dark:text-slate-300" aria-hidden="true" />
      <span
        className="pointer-events-none min-w-[1.25rem] text-center text-sm font-bold tracking-wide"
        aria-hidden="true"
      >
        {LANGUAGE_SHORT_CODES[current]}
      </span>
      <label className="sr-only" htmlFor="language-switcher">
        {t('a11y.language')}
      </label>
      <select
        id="language-switcher"
        value={current}
        onChange={event => {
          void i18n.changeLanguage(event.target.value);
        }}
        aria-label={t('a11y.language')}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {SUPPORTED_LANGUAGES.map(code => (
          <option key={code} value={code} lang={code}>
            {LANGUAGE_SHORT_CODES[code]} — {t(`language.${code}`)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
