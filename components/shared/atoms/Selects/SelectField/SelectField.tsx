import React from 'react';
import { useField, useFormikContext } from 'formik';
import { MultiValue, SingleValue } from 'react-select';

import Select from '../Select';

import { TOption, TSelectField } from '../types';

const SelectField = <T,>({
  variant = 'default',
  name,
  title,
  placeholder = '',
  isMulti = false,
  controlShouldRenderValue = true,
  closeMenuOnSelect = true,
  hideSelectedOptions = false,
  disabled = false,
  isClearable = true,
  rounded = false,
  height = '11rem',
  options,
  showError = true,
  onChange = () => {},
  readOnly = false,
  ...props
}: TSelectField<T>): JSX.Element => {
  const { isSubmitting } = useFormikContext();
  const [, { value, error, touched }, { setValue, setTouched }] = useField<T | T[] | null>(name);

  const selectedOption =
    isMulti && Array.isArray(value)
      ? options.filter(item => value.includes(item.value))
      : options.find(item => item.value === value) || null;

  const onOptionChange = (newValue: SingleValue<TOption<T>> | MultiValue<TOption<T>>) => {
    if (newValue && 'value' in newValue) {
      setValue(newValue?.value || null);
    } else {
      setValue(newValue?.map(el => el.value) || null);
    }
    setTouched(true, false);
    onChange(newValue || null);
  };

  return (
    <Select
      variant={variant}
      name={name}
      title={title}
      placeholder={placeholder}
      isMulti={isMulti}
      controlShouldRenderValue={controlShouldRenderValue}
      closeMenuOnSelect={closeMenuOnSelect}
      hideSelectedOptions={hideSelectedOptions}
      disabled={isSubmitting || disabled}
      isClearable={isClearable}
      rounded={rounded}
      height={height}
      options={options}
      value={selectedOption}
      onChange={onOptionChange}
      error={showError && touched ? error : undefined}
      readOnly={readOnly}
      {...props}
    />
  );
};

export default SelectField;
