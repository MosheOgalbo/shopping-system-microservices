import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_STORAGE_KEY, getDirection, isAppLanguage } from '../i18n';
import { applyTheme, getPreferredTheme } from '../theme';

/** Keeps <html lang/dir>, document title, theme, and persisted language in sync. */
const DocumentDirection = () => {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    applyTheme(getPreferredTheme());
  }, []);

  useEffect(() => {
    const language = isAppLanguage(i18n.language) ? i18n.language : 'he';
    const direction = getDirection(language);
    const root = document.documentElement;

    root.lang = language;
    root.dir = direction;
    document.title = t('header.documentTitle');
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [i18n.language, t]);

  return null;
};

export default DocumentDirection;
