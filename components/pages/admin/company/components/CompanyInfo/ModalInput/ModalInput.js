import React from 'react';
import Input from 'components/shared/atoms/Input';

const ModalInput = () => {
  return (
    <Input
      rounded
      type="textarea"
      testId="reason"
      placeholder="Укажите причину блокировки"
      title="Укажите причину блокировки"
      name="reason"
    />
  );
};

export default ModalInput;
