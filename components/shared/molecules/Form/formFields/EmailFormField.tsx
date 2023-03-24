import React, { FC } from 'react';
import { Field } from 'formik';

import { EmailFormFieldConfig } from './types';

const EmailFormField: FC<EmailFormFieldConfig> = ({ name, testId, disabled, placeholder }) => {
  return (
    <Field
      type="email"
      name={name}
      id={name}
      data-testid={testId}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

export default EmailFormField;
