import { FC } from 'react';
import { ErrorMessage } from 'formik';

import { ErrorWrapper, FieldLabel, FieldWrapper } from './styled';
import { TDefaultFieldWrapper } from './types';

const DefaultFieldWrapper: FC<TDefaultFieldWrapper> = ({ name, title, children }) => {
  return (
    <FieldWrapper key={name}>
      {title && <FieldLabel htmlFor={name}>{title}</FieldLabel>}
      {children}
      <ErrorMessage name={name}>{msg => <ErrorWrapper>{msg}</ErrorWrapper>}</ErrorMessage>
    </FieldWrapper>
  );
};

export default DefaultFieldWrapper;
