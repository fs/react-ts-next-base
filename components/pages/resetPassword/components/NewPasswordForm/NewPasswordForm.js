import React from 'react';
import * as Yup from 'yup';

import useNotifier from 'hooks/useNotifier';
import { useUpdatePassword } from 'lib/apollo/hooks/actions/auth';
import { passwordRegularExp } from 'config/constants/regularExpressions';
import {
  PASSWORD_INVALID_FORMAT,
  PASSWORD_INVALID_LENGTH,
  PASSWORD_MATCH,
  REQUIRED_FIELD,
} from 'config/constants/errorsText';

import ResetForm from '../ResetForm';

const NewPasswordForm = ({ query = {} }) => {
  const [updatePassword] = useUpdatePassword();

  const { setError } = useNotifier();

  const { reset_token: resetToken } = query;

  const onSubmit = async ({ password }, { setSubmitting }) => {
    try {
      setSubmitting(true);

      await updatePassword({ password, resetToken });

      setSubmitting(false);
    } catch (error) {
      setError(error);
    }
  };

  const fields = [
    {
      type: 'password',
      name: 'password',
      testId: 'password',
      placeholder: 'Новый пароль',
    },
    {
      type: 'password',
      name: 'passwordConfirmation',
      testId: 'passwordConfirmation',
      placeholder: 'Еще раз новый пароль',
    },
  ];

  const initialValues = {
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(REQUIRED_FIELD)
      .trim()
      .min(6, PASSWORD_INVALID_LENGTH)
      .matches(passwordRegularExp, PASSWORD_INVALID_FORMAT),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], PASSWORD_MATCH)
      .required(REQUIRED_FIELD),
  });

  const form = {
    fields,
    initialValues,
    validationSchema,
    onSubmit,
  };

  return <ResetForm form={form} />;
};

export default NewPasswordForm;
