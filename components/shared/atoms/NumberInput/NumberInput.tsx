import React from 'react';
import NumberFormat from 'react-number-format';
import { Field, ErrorMessage } from 'formik';

import { FieldWrapper, ErrorWrapper, FieldLabel } from './styled';
import { TNumberInput, TNumberInputComponent } from './types';
import { borderConfig, heightConfig, paddingConfig, showErrorMessage, showTitle } from './config';

const numberInput: React.FunctionComponent<TNumberInput> = ({
  field: { name, value },
  form: { isSubmitting, setFieldValue, setFieldTouched },
  variant,
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
      {!!(value && title && showTitle[variant]) && <FieldLabel htmlFor={title}>{title}</FieldLabel>}
      <NumberFormat
        type="text"
        name={name}
        data-testid={testId}
        data-cy={testId}
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

const NumberInput: React.FunctionComponent<TNumberInputComponent> = ({
  variant = 'default',
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
    <FieldWrapper
      border={borderConfig[variant]}
      padding={paddingConfig[variant]}
      $height={heightConfig[variant]}
      textAlign={textAlign}
      {...props}
    >
      <Field
        variant={variant}
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
      {errorMessage && showErrorMessage[variant] && (
        <ErrorMessage name={name}>{msg => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
      )}
    </FieldWrapper>
  );
};

export default NumberInput;
