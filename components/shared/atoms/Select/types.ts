import { MultiValue, SingleValue } from 'react-select';

import { TMargin } from 'public/styles/config/margin';

export type TFieldWrapperProps = TMargin & {
  isMulti: boolean;
};

export type TReactSelectProps = {
  height: string;
  rounded: boolean;
  readOnly?: boolean;
};

export type TOption<T> = { value: T; label: string };

export type TSelect<T> = TMargin & {
  options: TOption<T>[];
  value: TOption<T> | TOption<T>[] | null;
  name: string;
  disabled?: boolean;
  title?: string;
  isMulti?: boolean;
  controlShouldRenderValue?: boolean;
  placeholder?: string;
  height?: string;
  closeMenuOnSelect?: boolean;
  hideSelectedOptions?: boolean;
  isClearable?: boolean;
  rounded?: boolean;
  onChange?: (option: MultiValue<TOption<T>> | SingleValue<TOption<T>> | null) => void;
  error?: string;
  readOnly?: boolean;
};
