import { ChangeEvent } from 'react';

import { BaseFormFieldConfig } from '../types';

export type CheckboxFormFieldConfig = BaseFormFieldConfig;

export type EmailFormFieldConfig = BaseFormFieldConfig & {
  placeholder?: string;
};

export type FileFormFieldConfig = BaseFormFieldConfig & {
  accept?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 */
export enum PasswordAutocomplete {
  off = 'off',
  newPassword = 'new-password',
  currentPassword = 'current-password',
}

export type PasswordFormFieldConfig = BaseFormFieldConfig & {
  autoComplete?: PasswordAutocomplete;
  placeholder?: string;
};

export type OptionType = {
  label: string | number;
  value: string | number;
};

export type SelectFormFieldConfig = BaseFormFieldConfig & {
  options?: OptionType[];
  placeholder?: string;
};

export type SubmitButtonFieldConfig = BaseFormFieldConfig;

export type TextareaFormFieldConfig = BaseFormFieldConfig;

export type TextFormFieldConfig = BaseFormFieldConfig & {
  placeholder?: string;
};
