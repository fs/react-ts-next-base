import { ColorKeys } from 'public/styles/config/colors';
import { ParsedUrlQuery } from 'querystring';

export enum EVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  LIGHT = 'light',
}

export enum EPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export type TVariantProps = {
  fontWeight: number;
  size: string;
};

export type TVariantConfig = {
  [innerKey in EVariant]: TVariantProps;
};

export type TBreadcrumbs = {
  variant?: `${EVariant}`;
  back?: boolean;
  testId?: string;
  url: string;
  text: string;
  params?: ParsedUrlQuery;
  position?: `${EPosition}`;
};

export type TLinkProps = {
  fontStyle: TVariantProps;
  color: `${ColorKeys}`;
};

export type TColorConfig = { [innerKey in EVariant]: `${ColorKeys}` };
