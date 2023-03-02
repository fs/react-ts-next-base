import React from 'react';
import { Field } from 'formik';

import { PasswordFormFieldConfig } from './types';

const PasswordFormField: React.FunctionComponent<PasswordFormFieldConfig> = ({
  name,
  autoComplete,
  disabled,
  placeholder,
  testId,
}) => {
  return (
    <Field
      type="password"
      data-testid={testId}
      name={name}
      id={name}
      autoComplete={autoComplete}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

export default PasswordFormField;
