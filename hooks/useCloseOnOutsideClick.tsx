import { useEffect, useRef, useState } from 'react';

const useCloseOnOutsideClick = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const togglerRef = useRef<HTMLDivElement>(null);

  const handleMouseClick = (event: MouseEvent) => {
    const { target } = event;
    if (
      target instanceof HTMLElement &&
      !elementRef.current?.contains(target) &&
      !togglerRef.current?.contains(target) &&
      isOpen
    )
      setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleMouseClick, true);
    return () => {
      document.removeEventListener('click', handleMouseClick, true);
    };
  }, [isOpen]);

  return [isOpen, setIsOpen, elementRef, togglerRef] as const;
};

export default useCloseOnOutsideClick;
