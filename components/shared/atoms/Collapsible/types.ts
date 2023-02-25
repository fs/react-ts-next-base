import { TMargin } from 'public/styles/config/margin';
import { ColorKeys } from 'public/styles/config/colors';
import { IconKeys } from 'components/shared/atoms/Icon/config';

export enum EVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export type TAccordion = TMargin & {
  heading: string | JSX.Element;
  content?: string | JSX.Element;
  noContent?: string;
  open?: boolean;
  name: string;
};

export type TCollapsible = {
  variant?: `${EVariant}`;
  accordion: TAccordion[];
  disabled?: boolean;
};

export type TCollapsibleItem = {
  variant: `${EVariant}`;
  item: TAccordion;
  disabled?: boolean;
};

export type TColorConfig = { [innerKey in EVariant]: ColorKeys };

export type TIconConfig = { [innerKey in EVariant]: IconKeys };

export type TButtonStates = TMargin & {
  color: ColorKeys;
};
