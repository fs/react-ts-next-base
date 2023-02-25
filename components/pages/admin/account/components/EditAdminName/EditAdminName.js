import React, { useState } from 'react';
import * as Yup from 'yup';
import { REQUIRED_FIELD } from 'config/constants/errorsText';

import { useUpdateUser } from 'lib/apollo/hooks/actions/currentUser';

import EditAdminNameForm from './EditAdminNameForm';

import { EditAdminNameWrapper } from './styled';

const EditAdminName = ({ user }) => {
  const { firstName, lastName, middleName } = user || {};

  const [editable, setEditable] = useState(false);

  const onToggleEditable = () => setEditable(edit => !edit);

  const [updateUser] = useUpdateUser();

  const fields = [
    {
      name: 'lastName',
      type: 'text',
      placeholder: 'Фамилия',
      title: 'Фамилия',
    },
    {
      name: 'firstName',
      type: 'text',
      placeholder: 'Имя',
      title: 'Имя',
    },
    {
      name: 'middleName',
      type: 'text',
      placeholder: 'Отчество',
      title: 'Отчество',
    },
  ];

  const initialValues = {
    lastName: lastName || '',
    firstName: firstName || '',
    middleName: middleName || '',
  };

  const validationSchema = Yup.object().shape({
    lastName: Yup.string().required(REQUIRED_FIELD),
    firstName: Yup.string().required(REQUIRED_FIELD),
    middleName: Yup.string(),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    await updateUser(values);
    setEditable(false);

    setSubmitting(false);
  };

  const form = {
    fields,
    initialValues,
    validationSchema,
    onSubmit,
  };

  return (
    <EditAdminNameWrapper>
      <EditAdminNameForm form={form} editable={editable} onToggleEditable={onToggleEditable} />
    </EditAdminNameWrapper>
  );
};

export default EditAdminName;
