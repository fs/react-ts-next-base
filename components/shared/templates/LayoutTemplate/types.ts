import React from 'react';

export enum EVariant {
  LIGHT = 'light',
  TRANSPARENT = 'transparent',
}

export type TContentProps = {
  isMenuOpened: boolean;
  isShowScroll: boolean;
};

export type TLayoutTemplate = {
  children: React.ReactNode;
  testId?: string;
  variant?: `${EVariant}`;
  isShowMainMenu?: boolean;
  contentRef?: () => void;
  isShowScroll?: boolean;
};
