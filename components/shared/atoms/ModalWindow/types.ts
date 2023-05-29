import { ReactNode } from 'react';
import { Property } from 'csstype';

import { TWidth } from 'public/styles/config/width';

export type TModalWindow = TWidth & {
  isOpen: boolean;
  setIsOpen?: (state: boolean) => void;
  isClosable?: boolean;
  closeOnOverlayClick?: boolean;
  children: ReactNode;
  padding?: Property.Padding;
  rounded?: boolean;
  title?: string;
  onClose?: () => void;
};
