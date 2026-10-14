import React, { useEffect, useId, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SuccessModalProps } from '../types/index';

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, orderId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    closeButtonRef.current?.focus();

    const timer = window.setTimeout(() => {
      onClose();
      navigate('/shopping');
    }, 3000);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        navigate('/shopping');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose, navigate]);

  if (!isOpen) return null;

  const handleContinueShopping = () => {
    onClose();
    navigate('/shopping');
  };

  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 animate-fadeIn dark:bg-black/70">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="mx-4 max-w-md rounded-2xl bg-white p-8 shadow-2xl animate-slideInFromRight dark:bg-slate-900 dark:ring-1 dark:ring-slate-700"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-emerald-950">
            <div className="success-checkmark text-3xl text-green-600 dark:text-emerald-400" aria-hidden="true">✓</div>
          </div>
          <h2 id={titleId} className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
            {t('success.title')}
          </h2>
          <p className="text-gray-600 dark:text-slate-300">{t('success.thanks')}</p>
        </div>

        {orderId && (
          <div className="mb-6 rounded-lg bg-gray-50 p-4 text-center dark:bg-slate-800">
            <p className="mb-1 text-sm text-gray-600 dark:text-slate-300">{t('success.orderNumber')}</p>
            <p className="font-mono text-lg font-semibold text-emerald-700 dark:text-emerald-300">{orderId}</p>
          </div>
        )}

        <div id={descriptionId} className="mb-6 text-center">
          <p className="leading-relaxed whitespace-pre-line text-gray-700 dark:text-slate-200">
            {t('success.body')}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleContinueShopping}
            className="w-full rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-800 dark:bg-emerald-600"
          >
            {t('success.continue')}
          </button>

          <p className="text-center text-xs text-gray-500 dark:text-slate-400">{t('success.autoClose')}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
