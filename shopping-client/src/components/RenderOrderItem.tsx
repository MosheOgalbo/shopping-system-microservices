import React from 'react';
import { useTranslation } from 'react-i18next';
import { translateCatalogLabel } from '../i18n/catalog';
import { CartItem } from '../types/index';
import { isImageUrl } from '../util/products';

interface RenderOrderItemProps {
  item: CartItem;
}

const RenderOrderItem: React.FC<RenderOrderItemProps> = ({ item }) => {
  const { t } = useTranslation();
  const displayName = translateCatalogLabel(t, 'names', item.name);

  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-3 last:border-b-0 dark:border-slate-700">
      <div className="flex min-w-0 items-center">
        {isImageUrl(item.image) ? (
          <img
            src={item.image}
            alt={displayName}
            className="me-3 h-12 w-12 shrink-0 rounded-md object-cover"
          />
        ) : (
          <span className="me-3 text-2xl" aria-hidden="true">
            {item.image || '📦'}
          </span>
        )}

        <div className="min-w-0 text-start">
          <h4 className="break-words font-semibold dark:text-slate-50">{displayName}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            ₪{item.price.toFixed(2)} × {item.quantity}
          </p>
        </div>
      </div>

      <span className="shrink-0 font-bold text-slate-900 dark:text-slate-50">
        ₪{(item.price * item.quantity).toFixed(2)}
      </span>
    </div>
  );
};

export default RenderOrderItem;
