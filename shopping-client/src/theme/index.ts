export const THEME_STORAGE_KEY = 'shopping-app-theme';

export type AppTheme = 'light' | 'dark';

export function isAppTheme(value: string | null | undefined): value is AppTheme {
  return value === 'light' || value === 'dark';
}

export function getPreferredTheme(): AppTheme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (isAppTheme(stored)) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: AppTheme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#0f172a' : '#047857');
  }
}
