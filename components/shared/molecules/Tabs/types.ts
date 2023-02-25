import { ReactNode } from 'react';

export enum EVariant {
  DEFAULT = 'default',
  FLAT = 'flat',
  LINK_LIKE = 'link_like',
}

export type TTabParam = {
  id: string | number;
  name: string;
  action: () => void;
  content?: ReactNode;
};

export type TTabs = {
  variant?: `${EVariant}`;
  activeId?: string | number;
  withTransition?: boolean;
  tabs: TTabParam[];
};

export type TTab = {
  variant?: `${EVariant}`;
  isActive?: boolean;
  name: string;
  testId: string;
  onClick: () => void;
  withRightDelimiter: boolean;
};

export type TVariantConfig = {
  [innerKey in EVariant]: string;
};

export type TDelimiterConfig = {
  [innerKey in EVariant]: boolean;
};

export type TTabStates = {
  active: string;
  inactive: string;
};
export type TVariantStatesConfig = { [innerKey in EVariant]: TTabStates };

export type TTabStyleProps = {
  isActive: boolean;
  textSize: string;
  flexPosition: string;
  border: TTabStates;
  textColor: TTabStates;
  fontWeight: TTabStates;
  backgroundColor: TTabStates;
  withRightDelimiter: boolean;
};

export type TTabListStyleProps = {
  gap: string;
};
