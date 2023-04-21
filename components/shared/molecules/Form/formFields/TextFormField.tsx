import { FC } from 'react';
import { Field } from 'formik';

import { TextFormFieldConfig } from './types';

const TextFormField: FC<TextFormFieldConfig> = ({ placeholder, disabled, name, testId }) => {
  return (
    <Field
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      name={name}
      id={name}
      data-testid={testId}
    />
  );
};

export default TextFormField;
