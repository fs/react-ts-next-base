import { UrlObject } from 'url';
import { TMargin } from 'public/styles/config/margin';
import { ColorKeys } from 'public/styles/config/colors';

export type TActionLink = TMargin & {
  onClick?: () => void;
  label?: string;
  size?: number;
  bold?: boolean;
  children?: React.ReactNode;
  $color?: ColorKeys;
  href?: UrlObject | string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: React.HTMLAttributeReferrerPolicy;
};

export type TStyledLinkProps = TMargin & {
  $size: number;
  $bold?: boolean;
  $color: ColorKeys;
  href?: UrlObject | string;
};
