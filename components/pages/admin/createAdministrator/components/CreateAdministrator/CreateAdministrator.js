import React from 'react';
import * as Yup from 'yup';
import { useModal } from '@ebay/nice-modal-react';

import { phoneRegularExp } from 'config/constants/regularExpressions';
import { EMAIL_INVALID, PHONE_INVALID, REQUIRED_FIELD } from 'config/constants/errorsText';

import { useCreateAdmin } from 'lib/apollo/hooks/actions/admin';

import AcceptModal from 'components/shared/molecules/Modal/AcceptModal';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import CreateAdministratorForm from './CreateAdministratorForm';

const CreateAdministrator = () => {
  const acceptMemberModal = useModal(AcceptModal);
  const createAdminModal = useModal(SimpleModal);

  const showAcceptMember = () => {
    acceptMemberModal.show({
      title: 'Администратор приглашен',
    });
  };

  const [createAdmin] = useCreateAdmin({ onSubmit: showAcceptMember });

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
    {
      name: 'email',
      type: 'text',
      placeholder: 'e-mail',
      title: 'e-mail',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      placeholder: 'Телефон',
      title: 'Телефон',
    },
  ];

  const initialValues = {
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    phoneNumber: '+7',
  };

  const validationSchema = Yup.object().shape({
    lastName: Yup.string().required(REQUIRED_FIELD),
    firstName: Yup.string().required(REQUIRED_FIELD),
    middleName: Yup.string(),
    email: Yup.string().email(EMAIL_INVALID).required(REQUIRED_FIELD),
    phoneNumber: Yup.string().matches(phoneRegularExp, PHONE_INVALID).required(REQUIRED_FIELD),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    createAdminModal.show({
      variant: 'confirm',
      roundedButton: true,
      onSubmit: async () => {
        await createAdmin(values);
      },
      title: 'Приглашение админа',
      description: (
        <>
          Вы уверены что хотите пригласить
          <br /> пользователя <strong>{values.email}</strong>?
        </>
      ),
    });

    setSubmitting(false);
  };

  const form = {
    fields,
    initialValues,
    validationSchema,
    onSubmit,
  };

  return <CreateAdministratorForm form={form} />;
};

export default CreateAdministrator;
