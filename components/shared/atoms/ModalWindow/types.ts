import React from 'react';
import { Property } from 'csstype';
import { TWidth } from 'public/styles/config/width';

export enum EPosition {
  CENTER = 'center',
  TOP = 'top',
}

export type TModalWindow = TWidth & {
  position?: `${EPosition}`;
  isOpen: boolean;
  setIsOpen?: (state: boolean) => void;
  isClosable?: boolean;
  closeOnOverlayClick?: boolean;
  children: React.ReactNode;
  padding?: Property.Padding;
  rounded?: boolean;
  title?: string;
  onClose?: () => void;
};

type TVariantStates = {
  top: string;
  left: string;
  transform: string;
};

export type TPositionConfig = { [innerKey in EPosition]: TVariantStates };
