import { ESize } from 'public/styles/config/size';
import { TMargin } from 'public/styles/config/margin';
import { TWidth } from 'public/styles/config/width';

export enum EShape {
  NONE = 'none',
  ROUNDED = 'rounded',
  EXTRA_ROUNDED = 'extra-rounded',
}

export type TCounter = TMargin &
  TWidth & {
    name: string;
    min?: number;
    max?: number;
    size?: `${ESize}`;
    shape?: `${EShape}`;
    disabled?: boolean;
    onChange?: (value: number) => void;
  };

type TSizeStates = {
  height: string;
  iconSize: number;
};

export type TSizeConfig = { [innerKey in ESize]: TSizeStates };

export type TShapeConfig = { [innerKey in EShape]: string };

export type TCounterProps = TWidth &
  TMargin & {
    size: TSizeStates;
    borderRadius: string;
  };
