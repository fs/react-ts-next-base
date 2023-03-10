import { FieldInputProps, FormikProps } from 'formik';
import { TMargin } from 'public/styles/config/margin';

export enum EVariant {
  DEFAULT = 'default',
  TABLE_CELL = 'table_cell',
}

export enum ETextPosition {
  CENTER = 'center',
  RIGHT = 'right',
  LEFT = 'left',
}

export type TNumberInputParam = {
  testId?: string;
  title?: string;
  placeholder?: string;
  suffix?: string;
  prefix?: string;
  disabled?: boolean;
  onChange?: (val: number | undefined) => void;
  allowNegative?: boolean;
  decimalScale?: number;
};

export type TNumberInput = TNumberInputParam & {
  form: FormikProps<object>;
  variant: `${EVariant}`;
  onBlur: (val: number) => void;
  field: FieldInputProps<number>;
  readOnly?: boolean;
};

export type TNumberInputComponent = TNumberInputParam &
  TMargin & {
    name: string;
    variant?: `${EVariant}`;
    errorMessage?: boolean;
    onBlur?: (val: number) => void;
    textAlign?: `${ETextPosition}`;
    readOnly?: boolean;
  };

export type TVariantConfig = {
  [innerKey in EVariant]: string;
};

export type TVariantFlag = {
  [innerKey in EVariant]: boolean;
};

export type FieldWrapperProps = {
  textAlign: `${ETextPosition}`;
  border: string;
  padding: string;
  $height: string;
};
