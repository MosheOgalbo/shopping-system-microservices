import type { TFunction } from 'i18next';

type CatalogKind = 'categories' | 'names' | 'descriptions';

export function translateCatalogLabel(
  t: TFunction,
  kind: CatalogKind,
  value?: string | null
): string {
  if (!value) return '';
  return t(`catalog.${kind}.${value}`, { defaultValue: value });
}
