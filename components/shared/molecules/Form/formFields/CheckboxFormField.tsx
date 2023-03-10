import React, { FC } from 'react';
import { Field } from 'formik';

import { CheckboxFormFieldConfig } from './types';

const CheckboxFormField: FC<CheckboxFormFieldConfig> = ({ name, label, testId, disabled }) => {
  return (
    <label htmlFor={name}>
      <Field type="checkbox" name={name} id={name} data-testid={testId} disabled={disabled} />
      {label}
    </label>
  );
};

export default CheckboxFormField;
