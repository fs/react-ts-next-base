import React from 'react';

import Input from 'components/shared/atoms/Input';

import { InputWrapper, Title } from './styled';

const AdminAccountInput = ({ title, name, type, placeholder, disabled }) => {
  return (
    <InputWrapper>
      <Title>{title}</Title>
      <Input
        type={type}
        name={name}
        testId={name}
        placeholder={placeholder}
        disabled={disabled}
        rounded
      />
    </InputWrapper>
  );
};

export default AdminAccountInput;
