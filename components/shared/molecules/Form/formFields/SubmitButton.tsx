import React from 'react';
import { Field } from 'formik';

import { SubmitButtonFieldConfig } from './types';

const SubmitButton: React.FunctionComponent<SubmitButtonFieldConfig> = ({
  name,
  testId,
  disabled,
}) => {
  return <Field type="submit" id={name} name={name} data-testid={testId} disabled={disabled} />;
};

export default SubmitButton;
