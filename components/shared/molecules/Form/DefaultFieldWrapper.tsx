import React from 'react';
import { ErrorMessage } from 'formik';

import { TDefaultFieldWrapper } from './types';

import { ErrorWrapper, FieldLabel, FieldWrapper } from './styled';

const DefaultFieldWrapper: React.FunctionComponent<TDefaultFieldWrapper> = ({
  name,
  title,
  children,
}) => {
  return (
    <FieldWrapper key={name}>
      {title && <FieldLabel htmlFor={name}>{title}</FieldLabel>}
      {children}
      <ErrorMessage name={name}>{msg => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
    </FieldWrapper>
  );
};

export default DefaultFieldWrapper;
