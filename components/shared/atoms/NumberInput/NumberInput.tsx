import React, { FC } from 'react';
import NumberFormat from 'react-number-format';
import { Field, ErrorMessage } from 'formik';

import { FieldWrapper, ErrorWrapper, FieldLabel } from './styled';
import { TNumberInput, TNumberInputComponent } from './types';

const numberInput: FC<TNumberInput> = ({
  field: { name, value },
  form: { isSubmitting, setFieldValue, setFieldTouched },
  placeholder,
  title,
  suffix,
  prefix,
  testId,
  disabled,
  onChange,
  onBlur,
  decimalScale,
  allowNegative,
  readOnly = false,
}) => {
  return (
    <>
      {!!(value && title) && <FieldLabel htmlFor={title}>{title}</FieldLabel>}
      <NumberFormat
        type="text"
        name={name}
        data-testid={testId}
        value={value}
        onValueChange={({ floatValue }) =>
          onChange
            ? onChange(floatValue)
            : setFieldValue(name, floatValue === undefined ? '' : floatValue)
        }
        placeholder={placeholder}
        onBlur={() => {
          if (!readOnly) setFieldTouched(name);
          onBlur(value);
        }}
        suffix={suffix}
        prefix={prefix}
        thousandSeparator=" "
        decimalScale={decimalScale}
        allowNegative={allowNegative}
        disabled={isSubmitting || disabled}
        readOnly={readOnly}
      />
    </>
  );
};

const NumberInput: FC<TNumberInputComponent> = ({
  name,
  testId,
  title = '',
  placeholder = '',
  suffix = '',
  prefix = '',
  errorMessage = true,
  disabled,
  onChange,
  onBlur = () => {},
  decimalScale = 0,
  allowNegative = false,
  textAlign = 'left',
  readOnly = false,
  ...props
}) => {
  return (
    <FieldWrapper textAlign={textAlign} {...props}>
      <Field
        name={name}
        placeholder={placeholder}
        title={title}
        suffix={suffix}
        prefix={prefix}
        testId={testId}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        decimalScale={decimalScale}
        allowNegative={allowNegative}
        component={numberInput}
        readOnly={readOnly}
      />
      {errorMessage && (
        <ErrorMessage name={name}>{msg => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
      )}
    </FieldWrapper>
  );
};

export default NumberInput;
