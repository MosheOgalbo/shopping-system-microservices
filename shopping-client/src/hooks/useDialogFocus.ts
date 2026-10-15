import { RefObject, useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function useDialogFocus(active: boolean, containerRef: RefObject<HTMLElement | null>) {
  const previous = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return undefined;
    previous.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const container = containerRef.current;

    const focusable = () => Array.from(container?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    const initial = focusable();
    (initial[0] ?? container)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !container) return;
      const items = focusable();
      if (items.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && (current === first || !container.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (previous.current?.isConnected) previous.current.focus();
    };
  }, [active, containerRef]);
}
