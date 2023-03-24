import React, { useState, useId } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { ActionMeta, InputActionMeta, MultiValue, SingleValue } from 'react-select';
import { Field, ErrorMessage, useField, useFormikContext, FieldProps } from 'formik';

import { loadOptions } from './helpers';
import { heightConfig } from '../config';
import { TOption, TAsyncSelect } from '../types';
import { FieldWrapper, FieldLabel, reactSelectStyles, ErrorWrapper } from '../styled';

const AsyncSelect = <T,>({
  variant = 'default',
  name,
  title,
  fetchFn,
  initialValue = null,
  placeholder = '',
  disabled = false,
  isClearable = true,
  showError = true,
  rounded = false,
  height = '11rem',
  onChange = () => {},
  onAfterChange = () => {},
  readOnly = false,
  ...props
}: TAsyncSelect<T>): JSX.Element => {
  const { isSubmitting } = useFormikContext();
  const [, , { setValue }] = useField<T | null>(name);
  const styles = reactSelectStyles<T>({ height, variant, rounded, readOnly });
  const [selectedOption, setSelectedOption] = useState<TOption<T> | null>(initialValue);

  const noOptionsMessage = ({ inputValue }: { inputValue: string }) => {
    return inputValue ? 'Ничего не найдено' : 'Введите данные';
  };

  const hasTitle = selectedOption && title && variant === 'default';
  const hasError = showError && variant === 'default';

  return (
    <FieldWrapper height={heightConfig[variant]} isMulti={false} {...props}>
      {hasTitle && <FieldLabel htmlFor={title}>{title}</FieldLabel>}
      <Field
        name={name}
        component={({ field }: FieldProps) => {
          const [inputValue, setInputValue] = useState<string>(selectedOption?.label || '');

          const onInputChange = (value: string, { action }: InputActionMeta) => {
            if (action === 'input-change') {
              setInputValue(value);
            }
          };

          const onOptionChange = (
            newValue: SingleValue<TOption<T>> | MultiValue<TOption<T>>,
            { action }: ActionMeta<TOption<T>>,
          ) => {
            if (action === 'clear') {
              setInputValue('');
              if (selectedOption) {
                setValue(null);
                setSelectedOption(null);
                onChange(null);
              }
            } else if (newValue && 'value' in newValue) {
              setSelectedOption(newValue);
              setValue(newValue?.value || null);
              onChange(newValue);
            }
            onAfterChange();
          };

          return (
            <AsyncPaginate
              {...field}
              id={name}
              instanceId={useId()}
              isMulti={false}
              debounceTimeout={250}
              value={selectedOption}
              loadOptions={(search: string) => loadOptions<T>(search, fetchFn)}
              onChange={onOptionChange}
              placeholder={placeholder}
              loadingMessage={() => 'Загрузка...'}
              noOptionsMessage={noOptionsMessage}
              isClearable={isClearable}
              isDisabled={isSubmitting || disabled || readOnly}
              styles={styles}
              inputId={name}
              inputValue={inputValue}
              onInputChange={onInputChange}
              backspaceRemovesValue={false}
              controlShouldRenderValue={false}
            />
          );
        }}
      />
      {hasError && <ErrorMessage name={name} render={msg => <ErrorWrapper>{msg}</ErrorWrapper>} />}
    </FieldWrapper>
  );
};

export default AsyncSelect;
