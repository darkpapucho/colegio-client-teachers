import { useEffect, useRef } from 'react';

export default function useClickOutside<T extends HTMLElement>(handler: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function listener(event: MouseEvent) {
      const target = event.target;
      if (ref.current && !ref.current.contains(target as T)) {
        handler();
      }
    }
    document.addEventListener('click', listener, true);
    return () => document.removeEventListener('click', listener, true);
  }, [ref]);
  return { ref };
}
