import React from 'react';
import * as Yup from 'yup';
import { REQUIRED_FIELD } from 'config/constants/errorsText';

import Input from 'components/shared/atoms/Input';

export const ModalInput = () => {
  return (
    <Input
      rounded
      type="textarea"
      testId="rejection-reason"
      placeholder="Добавьте поясняющий комментарий"
      name="rejectionReason"
    />
  );
};

export const initialReasonValue = {
  rejectionReason: '',
};

export const validationSchemaReason = Yup.object().shape({
  rejectionReason: Yup.string().required(REQUIRED_FIELD),
});
