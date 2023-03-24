import React, { FC } from 'react';
import { Field } from 'formik';

import { TextareaFormFieldConfig } from './types';

const TextareaFormField: FC<TextareaFormFieldConfig> = ({ name, testId, disabled }) => {
  return (
    <Field component="textarea" name={name} id={name} data-testid={testId} disabled={disabled} />
  );
};

export default TextareaFormField;
