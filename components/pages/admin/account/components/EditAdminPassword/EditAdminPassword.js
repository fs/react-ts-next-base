import React, { useState } from 'react';
import * as Yup from 'yup';

import {
  PASSWORD_INVALID_FORMAT,
  PASSWORD_MATCH,
  REQUIRED_FIELD,
} from 'config/constants/errorsText';
import { passwordRegularExp } from 'config/constants/regularExpressions';
import { useUpdateUserPassword } from 'lib/apollo/hooks/actions/currentUser';

import EditAdminPasswordForm from './EditAdminPasswordForm';

const EditAdminPassword = () => {
  const [editable, setEditable] = useState(false);

  const onToggleEditable = () => setEditable(edit => !edit);

  const [updatePassword] = useUpdateUserPassword();

  const fields = [
    {
      type: 'password',
      name: 'prevPassword',
      title: 'Текущий пароль',
      placeholder: 'Текущий пароль',
    },
    {
      type: 'password',
      name: 'newPassword',
      title: 'Новый пароль',
      placeholder: 'Новый пароль',
    },
    {
      type: 'password',
      name: 'newPasswordConfirm',
      title: 'Подтвердить пароль',
      placeholder: 'Подтвердить пароль',
    },
  ];

  const initialValues = {
    prevPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  };

  const validationSchema = Yup.object().shape({
    prevPassword: Yup.string().required(REQUIRED_FIELD),
    newPassword: Yup.string()
      .matches(passwordRegularExp, PASSWORD_INVALID_FORMAT)
      .required(REQUIRED_FIELD),
    newPasswordConfirm: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], PASSWORD_MATCH)
      .required(REQUIRED_FIELD),
  });

  const onSubmit = async (
    { prevPassword: currentPassword, newPassword: password },
    { setSubmitting, resetForm },
  ) => {
    setSubmitting(true);

    const updatedUser = await updatePassword({ currentPassword, password });
    if (updatedUser) resetForm(initialValues);

    setSubmitting(false);
  };

  const form = {
    fields,
    initialValues,
    validationSchema,
    onSubmit,
  };

  return (
    <EditAdminPasswordForm form={form} editable={editable} onToggleEditable={onToggleEditable} />
  );
};

export default EditAdminPassword;
