import React, { FC } from 'react';
import { Field } from 'formik';

import { SubmitButtonFieldConfig } from './types';

const SubmitButton: FC<SubmitButtonFieldConfig> = ({ name, testId, disabled }) => {
  return <Field type="submit" id={name} name={name} data-testid={testId} disabled={disabled} />;
};

export default SubmitButton;
