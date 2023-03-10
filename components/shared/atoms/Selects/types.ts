import { MultiValue, SingleValue } from 'react-select';

import { TMargin } from 'public/styles/config/margin';

export enum EVariant {
  DEFAULT = 'default',
  TABLE_CELL = 'table-cell',
}

export type TFieldWrapperProps = TMargin & {
  height: string;
  isMulti: boolean;
};

export type TReactSelectProps = {
  height: string;
  variant: `${EVariant}`;
  rounded: boolean;
  readOnly?: boolean;
};

export type TOption<T> = { value: T; label: string };

export type TVariantConfig = { [innerKey in EVariant]: string };

export type TFetchFn<T> = ({
  after,
  name,
}: {
  after?: string;
  name?: string;
}) => Promise<{ nodes: { id: T; name: string }[] }>;

export type TSelect<T> = TMargin & {
  variant?: `${EVariant}`;
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
  showError?: boolean;
  onChange?: (option: MultiValue<TOption<T>> | SingleValue<TOption<T>> | null) => void;
  error?: string;
  readOnly?: boolean;
};

export type TSelectField<T> = Omit<TSelect<T>, 'value' | 'error'>;

export type TAsyncSelect<T> = Omit<TSelect<T>, 'value' | 'error' | 'options' | 'onChange'> & {
  onChange?: (option: TOption<T> | null) => void;
  initialValue?: TOption<T> | null;
  onAfterChange?: () => void;
  fetchFn: TFetchFn<T>;
  readOnly?: boolean;
};
