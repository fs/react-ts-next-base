import { FC } from 'react';
import { Field } from 'formik';

import { FileFormFieldConfig } from './types';

const FileFormField: FC<FileFormFieldConfig> = ({
  name,
  accept,
  testId,
  onChange = () => {},
  disabled,
}) => {
  return (
    <Field
      type="file"
      id={name}
      name={name}
      accept={accept}
      data-testid={testId}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default FileFormField;
