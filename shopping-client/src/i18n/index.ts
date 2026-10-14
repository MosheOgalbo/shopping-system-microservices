import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import he from './locales/he.json';
import en from './locales/en.json';
import ar from './locales/ar.json';

export const SUPPORTED_LANGUAGES = ['he', 'en', 'ar'] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/** Compact language marks shown after selection (professional UI pattern). */
export const LANGUAGE_SHORT_CODES: Record<AppLanguage, string> = {
  he: 'ע',
  en: 'E',
  ar: 'ع',
};

export const RTL_LANGUAGES: readonly AppLanguage[] = ['he', 'ar'];

export const LANGUAGE_STORAGE_KEY = 'shopping-app-lang';

export function isAppLanguage(value: string | null | undefined): value is AppLanguage {
  return !!value && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

export function getDirection(language: string): 'rtl' | 'ltr' {
  return RTL_LANGUAGES.includes(language as AppLanguage) ? 'rtl' : 'ltr';
}

function resolveInitialLanguage(): AppLanguage {
  if (typeof window === 'undefined') return 'he';
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (isAppLanguage(stored)) return stored;
  return 'he';
}

void i18n.use(initReactI18next).init({
  resources: {
    he: { translation: he },
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: resolveInitialLanguage(),
  fallbackLng: 'he',
  supportedLngs: [...SUPPORTED_LANGUAGES],
  interpolation: { escapeValue: false },
});

export default i18n;
