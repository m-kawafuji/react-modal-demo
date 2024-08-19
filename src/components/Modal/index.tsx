import { useEffect, useRef } from 'react';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import FocusTrap from 'focus-trap-react';
import Portal from '../Portal';
import styles from './index.module.scss';

export default function Modal({
  open,
  onClose,
  children,
  initialFocus = false,
  ...props
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialFocus?: string | false;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && containerRef.current) {
      disableBodyScroll(containerRef.current);
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <Portal id="portal--modal">
      <FocusTrap
        active={open}
        focusTrapOptions={{
          checkCanFocusTrap,
          initialFocus: () =>
            initialFocus && document.getElementById(initialFocus),
        }}
      >
        <div
          className={styles.layer}
          aria-hidden={!open}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <div
            ref={containerRef}
            className={styles.container}
            role="dialog"
            aria-modal
            aria-label={props['aria-label']}
            aria-labelledby={props['aria-labelledby']}
          >
            {children}
          </div>
        </div>
      </FocusTrap>
    </Portal>
  );
}

async function checkCanFocusTrap(
  trapContainers: Array<HTMLElement | SVGElement>,
) {
  const results = trapContainers.map((trapContainer) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (getComputedStyle(trapContainer).visibility !== 'hidden') {
          resolve(null);
          clearInterval(interval);
        }
      }, 5);
    });
  });
  await Promise.all(results);
}
