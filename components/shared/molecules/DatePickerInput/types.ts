import { FormikErrors } from 'formik';
import { Config } from 'react-popper-tooltip';
import { ReactDatePickerProps } from 'react-datepicker';
import { TMargin } from 'public/styles/config/margin';
import { TWidth } from 'public/styles/config/width';
import { ESize } from 'public/styles/config/size';

export enum EVariant {
  DEFAULT = 'default',
  TABLE_CELL = 'table-cell',
}

export type TDatePickerInput = TMargin &
  TWidth & {
    variant?: `${EVariant}`;
    size?: `${ESize}`;
    name?: string;
    placeholder?: string;
    checkbox?: string | JSX.Element;
    error?: string | string[] | FormikErrors<object> | FormikErrors<object>[];
    disabled?: boolean;
    currentDate?: string;
    minDate?: ReactDatePickerProps['minDate'];
    maxDate?: ReactDatePickerProps['maxDate'];
    onSubmit?: (date?: string | null) => void;
    setFieldValue?: (name: string, date?: string | null) => void;
    clearable?: boolean;
    offset?: Config['offset'];
    readOnly?: boolean;
  };

export type TVariantConfig = { [innerKey in EVariant]: string };

export type TSizeStates = {
  height: string;
};
export type TSizeConfig = { [innerKey in ESize]: TSizeStates };

export type TDatePickerProps = TWidth & {
  variant: `${EVariant}`;
  border: string;
  size: TSizeStates;
};

export type TDatePickerFieldProps = {
  empty: boolean;
};
