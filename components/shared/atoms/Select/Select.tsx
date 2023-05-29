import { useId } from 'react';
import ReactSelect, { MultiValue, SingleValue } from 'react-select';

import { ErrorWrapper, FieldLabel, FieldWrapper, reactSelectStyles } from './styled';
import { TOption, TSelect } from './types';
import { MultiOption } from './helpers';

const Select = <T,>({
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
  value,
  error = '',
  onChange = () => {},
  readOnly = false,
  ...props
}: TSelect<T>): JSX.Element => {
  const styles = reactSelectStyles<T>({ height, rounded, readOnly });

  const onOptionChange = (newValue: SingleValue<TOption<T>> | MultiValue<TOption<T>>) => {
    onChange(newValue || null);
  };

  const hasTitle = (isMulti && Array.isArray(value) ? !!value.length : value) && title;

  return (
    <FieldWrapper isMulti={isMulti} {...props}>
      {hasTitle && <FieldLabel htmlFor={title}>{title}</FieldLabel>}
      <ReactSelect<TOption<T>, boolean>
        id={`select-${name}`}
        aria-label={`select-${name}`}
        inputId={name}
        isMulti={isMulti}
        instanceId={useId()}
        value={value}
        options={options}
        placeholder={placeholder}
        isDisabled={disabled || readOnly}
        styles={styles}
        noOptionsMessage={() => ''}
        onChange={onOptionChange}
        closeMenuOnSelect={closeMenuOnSelect}
        isClearable={isClearable && !readOnly}
        controlShouldRenderValue={controlShouldRenderValue}
        hideSelectedOptions={hideSelectedOptions}
        components={isMulti ? { Option: MultiOption } : {}}
      />
      {error && <ErrorWrapper>{error}</ErrorWrapper>}
    </FieldWrapper>
  );
};

export default Select;
