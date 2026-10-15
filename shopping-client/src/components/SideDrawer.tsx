import React, { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDialogFocus } from '../hooks/useDialogFocus';

interface SideDrawerProps {
  id: string;
  open: boolean;
  title: string;
  edge: 'start' | 'end';
  onClose: () => void;
  children: React.ReactNode;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ id, open, title, edge, onClose, children }) => {
  const { t } = useTranslation();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogFocus(open, panelRef);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const root = document.getElementById('root');
    root?.setAttribute('inert', '');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      root?.removeAttribute('inert');
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50" onMouseDown={onClose}>
      <div className="absolute inset-0 bg-slate-950/50 dark:bg-black/70" />
      <div
        id={id}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onMouseDown={event => event.stopPropagation()}
        className={`absolute inset-y-0 flex w-[min(22rem,calc(100%-2.5rem))] flex-col bg-white shadow-2xl outline-none dark:bg-slate-900 ${
          edge === 'start'
            ? 'start-0 drawer-from-start'
            : 'end-0 drawer-from-end'
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <h2 id={titleId} className="text-lg font-bold text-slate-950 dark:text-white">
            {title}
          </h2>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 dark:border-slate-600 dark:text-slate-100"
            aria-label={t('a11y.closeDialog')}
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default SideDrawer;
