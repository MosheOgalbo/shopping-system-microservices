import React from 'react';
import { useTranslation } from 'react-i18next';
import { CartItem } from '../types/index';
import RenderEmptyCart from './RenderEmptyCart';
import RenderOrderItem from './RenderOrderItem';

export interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
  const { t } = useTranslation();

  return (
    <div className="h-fit rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-700">
      <h3 className="mb-4 flex items-center text-2xl font-bold text-slate-900 dark:text-white">
        <span className="me-2" aria-hidden="true">🛒</span> {t('orderSummary.title')}
      </h3>

      {items.length > 0 ? (
        <div className="space-y-4 text-slate-900 dark:text-slate-100">
          {items.map(item => (
            <RenderOrderItem key={item.id} item={item} />
          ))}

          <div className="mt-6 flex justify-between border-t-2 border-slate-200 pt-4 text-xl font-bold dark:border-slate-700">
            <span>{t('orderSummary.total')}</span>
            <span className="text-emerald-800 dark:text-emerald-300">₪{total.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <RenderEmptyCart />
      )}
    </div>
  );
};

export default OrderSummary;
