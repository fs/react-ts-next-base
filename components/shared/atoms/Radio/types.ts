import { ReactNode } from 'react';

export enum EDirection {
  COLUMN = 'column',
  ROW = 'row',
}

type TOption<T> = {
  value: T;
  label: string | ReactNode;
  disabled?: boolean;
  tooltip?: string;
};

export type TRadio<T> = {
  options: TOption<T>[];
  direction?: `${EDirection}`;
  name: string;
  selected: T;
  boldSelectedValue?: boolean;
  onChange?: (value: T) => void;
  readOnly?: boolean;
  setFieldValue?: (name: string, value: T) => void;
};

export type TWrapperProps = {
  direction: string;
};

export type TLabelProps = {
  isChecked: boolean;
  disabled?: boolean;
  boldSelectedValue: boolean;
};
