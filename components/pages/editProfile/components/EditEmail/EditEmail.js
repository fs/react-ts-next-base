import React, { useState } from 'react';
import * as Yup from 'yup';

import { EMAIL_INVALID, REQUIRED_FIELD } from 'config/constants/errorsText';
import { useUpdateUserEmail } from 'lib/apollo/hooks/actions/currentUser';
import useNotifier from 'hooks/useNotifier';

import EditProfileForm from '../EditProfileForm';

const EditEmail = ({ email: currentEmail = '' }) => {
  const [emailNotificationsDisabled, setEmailNotificationsDisabled] = useState(false);
  const [emailMailingEnabled, setEmailMailingEnabled] = useState(false);

  const [updateUserEmail] = useUpdateUserEmail();
  const { setError } = useNotifier();

  const initialValues = {
    email: '',
    emailPassword: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(EMAIL_INVALID).required(REQUIRED_FIELD).nullable(),
    emailPassword: Yup.string().required(REQUIRED_FIELD),
  });

  const checkboxes = [
    {
      name: 'notifications',
      label: 'Не присылать уведомления по моим сделкам и спорам',
      onChange: setEmailNotificationsDisabled,
      checked: emailNotificationsDisabled,
    },
    {
      name: 'mailing',
      label: 'Согласен на рассылку от агрегатора',
      onChange: setEmailMailingEnabled,
      checked: emailMailingEnabled,
    },
  ];

  const onSubmit = async (
    { emailPassword: currentPassword, email },
    { setSubmitting, resetForm },
  ) => {
    const values = { email, currentPassword, emailNotificationsDisabled, emailMailingEnabled };
    setSubmitting(true);

    try {
      const updatedUser = await updateUserEmail(values);

      if (updatedUser) resetForm(initialValues);
    } catch (error) {
      setError(error);
    }

    setSubmitting(false);
  };

  const form = {
    field: {
      name: 'email',
      title: 'Новая почта',
      placeholder: 'Новая почта',
    },
    initialValues,
    validationSchema,
    onSubmit,
  };

  const title = `Почта: ${currentEmail.split('@')[0].slice(0, 2)}***@${currentEmail.split('@')[1]}`;

  return <EditProfileForm form={form} title={title} checkboxes={checkboxes} />;
};

export default EditEmail;
