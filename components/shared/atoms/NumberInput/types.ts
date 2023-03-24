import { FieldInputProps, FormikProps } from 'formik';
import { TMargin } from 'public/styles/config/margin';

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
  onBlur: (val: number) => void;
  field: FieldInputProps<number>;
  readOnly?: boolean;
};

export type TNumberInputComponent = TNumberInputParam &
  TMargin & {
    name: string;
    errorMessage?: boolean;
    onBlur?: (val: number) => void;
    textAlign?: `${ETextPosition}`;
    readOnly?: boolean;
  };

export type FieldWrapperProps = TMargin & {
  textAlign: `${ETextPosition}`;
};
