import React, { useState } from 'react';
import * as Yup from 'yup';
import { EMAIL_INVALID, INVALID_FORMAT, REQUIRED_FIELD } from 'config/constants/errorsText';

import { useUpdateAdminAccount } from 'lib/apollo/hooks/actions/admin';

import { phoneRegularExp } from 'config/constants/regularExpressions';

import { phoneFormatter } from 'helpers';
import EditAdminInfoForm from './EditAdminInfoForm';

import { EditAdminInfoWrapper } from './styled';

const EditAdminInfo = ({ user }) => {
  const { email, phoneNumber } = user || {};

  const [editable, setEditable] = useState(false);

  const [updateAdminAccount] = useUpdateAdminAccount();

  const onToggleEditable = () => setEditable(edit => !edit);

  const fields = [
    {
      type: 'text',
      name: 'email',
      title: 'e-mail',
      placeholder: 'e-mail',
    },
    {
      type: 'text',
      name: 'phoneNumber',
      title: 'Телефон',
      placeholder: 'Телефон',
    },
    {
      type: 'password',
      name: 'currentPassword',
      title: 'Текущий пароль',
      placeholder: 'Текущий пароль',
    },
  ];

  const initialValues = {
    email: email || '',
    phoneNumber: phoneFormatter(phoneNumber) || '+7',
    currentPassword: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(REQUIRED_FIELD).email(EMAIL_INVALID),
    phoneNumber: Yup.string().required(REQUIRED_FIELD).matches(phoneRegularExp, INVALID_FORMAT),
    currentPassword: Yup.string().required(REQUIRED_FIELD),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    await updateAdminAccount(values);
    setEditable(false);

    setSubmitting(false);
  };

  const form = {
    fields,
    onSubmit,
    initialValues,
    validationSchema,
  };

  return (
    <EditAdminInfoWrapper>
      <EditAdminInfoForm form={form} editable={editable} onToggleEditable={onToggleEditable} />
    </EditAdminInfoWrapper>
  );
};

export default EditAdminInfo;
