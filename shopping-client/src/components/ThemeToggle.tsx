import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  THEME_STORAGE_KEY,
  applyTheme,
  getPreferredTheme,
  type AppTheme,
} from '../theme';

const ThemeToggle: React.FC = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<AppTheme>(() => getPreferredTheme());

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const sync = () => setTheme(getPreferredTheme());
    window.addEventListener('shopping-theme', sync);
    return () => window.removeEventListener('shopping-theme', sync);
  }, []);

  const nextTheme: AppTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(nextTheme);
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        setTheme(nextTheme);
        window.dispatchEvent(new Event('shopping-theme'));
      }}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      aria-label={theme === 'dark' ? t('a11y.switchToLight') : t('a11y.switchToDark')}
      aria-pressed={theme === 'dark'}
      title={theme === 'dark' ? t('a11y.switchToLight') : t('a11y.switchToDark')}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
