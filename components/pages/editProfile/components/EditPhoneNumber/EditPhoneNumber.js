import React, { useState } from 'react';
import * as Yup from 'yup';

import { useSendSmsCode } from 'lib/apollo/hooks/actions/auth';
import { useUpdateUserPhone } from 'lib/apollo/hooks/actions/currentUser';
import useNotifier from 'hooks/useNotifier';

import { INVALID_FORMAT, REQUIRED_FIELD } from 'config/constants/errorsText';
import { phoneRegularExp } from 'config/constants/regularExpressions';

import EditProfileForm from '../EditProfileForm';

const EditPhoneNumber = ({ phoneNumber: currentPhoneNumber }) => {
  const [phoneNotificationsDisabled, setPhoneNotificationsDisabled] = useState(false);
  const [phoneMailingEnabled, setPhoneMailingEnabled] = useState(false);
  const [smsCode, setSmsCode] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const [sendSmsCode] = useSendSmsCode();
  const [updateUserPhone] = useUpdateUserPhone();
  const { setError } = useNotifier();

  const onSendCode = async () => {
    await sendSmsCode(newPhoneNumber);
  };

  const initialValues = {
    phoneNumber: '+7',
    phoneNumberPassword: '',
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(phoneRegularExp, INVALID_FORMAT)
      .required(REQUIRED_FIELD)
      .nullable(),
    phoneNumberPassword: Yup.string().required(REQUIRED_FIELD),
  });

  const checkboxes = [
    {
      name: 'notifications',
      label: 'Не присылать уведомления по моим сделкам и спорам',
      onChange: setPhoneNotificationsDisabled,
      checked: phoneNotificationsDisabled,
    },
    {
      name: 'mailing',
      label: 'Согласен на рассылку от агрегатора',
      onChange: setPhoneMailingEnabled,
      checked: phoneMailingEnabled,
    },
  ];

  const onSubmit = async (
    { phoneNumber, phoneNumberPassword: currentPassword },
    { setSubmitting, resetForm },
  ) => {
    const values = {
      phoneNumber,
      currentPassword,
      smsCode,
      phoneNotificationsDisabled,
      phoneMailingEnabled,
    };
    setSubmitting(true);

    try {
      const updatedUser = await updateUserPhone(values);

      if (updatedUser) {
        resetForm(initialValues);
        setSmsCode('');
      }
    } catch (error) {
      setError(error);
    }

    setSubmitting(false);
  };

  const form = {
    field: {
      name: 'phoneNumber',
      title: 'Новый номер телефона',
      placeholder: 'Новый номер телефона',
    },
    initialValues,
    validationSchema,
    onSubmit,
  };

  const verificationForm = {
    value: currentPhoneNumber,
    buttonLabel: 'Выслать код для смены телефона',
    onSendCode,
    onCodeChange: setSmsCode,
    smsCode,
    phoneNumber: newPhoneNumber,
  };

  const title = currentPhoneNumber
    ? `Телефон: +7 (${currentPhoneNumber.slice(0, 3)})***${currentPhoneNumber.slice(-2)}`
    : '';

  return (
    <EditProfileForm
      form={form}
      verificationForm={verificationForm}
      title={title}
      checkboxes={checkboxes}
      setValue={setNewPhoneNumber}
    />
  );
};

export default EditPhoneNumber;
