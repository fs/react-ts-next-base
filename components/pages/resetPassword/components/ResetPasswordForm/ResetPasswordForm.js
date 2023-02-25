import React, { useEffect } from 'react';
import * as Yup from 'yup';

import { EMAIL_INVALID, REQUIRED_FIELD } from 'config/constants/errorsText';
import { usePasswordRecovery } from 'lib/apollo/hooks/actions/auth';
import useNotifier from 'hooks/useNotifier';

import ResetForm from '../ResetForm';

const ResetPasswordForm = () => {
  const [recoverPassword, detailMessage, errorMessage] = usePasswordRecovery();

  const { setSuccess, setError } = useNotifier();

  useEffect(() => {
    if (detailMessage) setSuccess(detailMessage);
  }, [detailMessage]);

  useEffect(() => {
    if (errorMessage) setError(errorMessage);
  }, [errorMessage]);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      await recoverPassword(values);

      setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fields = [
    {
      type: 'email',
      name: 'email',
      testId: 'email',
      placeholder: 'Введите e-mail',
    },
  ];

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(EMAIL_INVALID).required(REQUIRED_FIELD),
  });

  const form = {
    fields,
    initialValues,
    validationSchema,
    onSubmit,
  };

  return <ResetForm form={form} />;
};

export default ResetPasswordForm;
