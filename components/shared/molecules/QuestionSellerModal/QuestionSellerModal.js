import React, { useState } from 'react';
import * as Yup from 'yup';

import Button from 'components/shared/atoms/Button';
import ModalWindow from 'components/shared/atoms/ModalWindow';

import { REQUIRED_FIELD } from 'config/constants/errorsText';
import QuestionSellerModalForm from './QuestionSellerModalForm';

const QuestionSellerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = () => setIsOpen(true);

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    // eslint-disable-next-line no-console
    console.log(values);

    setSubmitting(false);
  };

  const initialValues = {
    message: '',
    photos: [],
  };

  const validationSchema = Yup.object().shape({
    message: Yup.string().required(REQUIRED_FIELD).nullable(),
  });

  const form = { onSubmit, initialValues, validationSchema };

  return (
    <>
      <Button
        label="Задать вопрос продавцу"
        variant="outlined-confirm"
        size="large"
        onClick={onOpenModal}
        $ml={8}
      />

      <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} $width="40rem">
        <QuestionSellerModalForm form={form} />
      </ModalWindow>
    </>
  );
};

export default QuestionSellerModal;
