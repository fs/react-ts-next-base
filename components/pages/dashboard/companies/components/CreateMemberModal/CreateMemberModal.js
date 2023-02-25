import React, { useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import * as Yup from 'yup';

import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';

import { EMAIL_MATCH, EMAIL_INVALID, REQUIRED_FIELD } from 'config/constants/errorsText';
import { useCreateCompanyMember } from 'lib/apollo/hooks/actions/companyMember';

import ModalWindow from 'components/shared/atoms/ModalWindow';

import MemberForm from '../MemberForm';

const CreateMemberModal = NiceModal.create(({ myCompanies, onSuccess, onError }) => {
  const { visible, remove } = useModal();

  const [createCompanyMember] = useCreateCompanyMember();
  const [checkedCompanies, setCheckedCompanies] = useState(
    myCompanies.map(({ id }) => ({
      id,
      checked: false,
    })),
  );

  const fields = [
    {
      type: 'text',
      name: 'email',
      initialValue: '',
      title: 'Введите e-mail нового пользователя',
      placeholder: 'Введите e-mail нового пользователя',
      validationSchema: Yup.string().email(EMAIL_INVALID).required(REQUIRED_FIELD).nullable(),
    },
    {
      type: 'text',
      name: 'confirmEmail',
      initialValue: '',
      title: 'Еще раз введите e-mail нового пользователя',
      placeholder: 'Еще раз введите e-mail нового пользователя',
      validationSchema: Yup.string()
        .email(EMAIL_INVALID)
        .oneOf([Yup.ref('email'), null], EMAIL_MATCH)
        .required(REQUIRED_FIELD)
        .nullable(),
    },
  ];

  const formByName = mapKeys(fields, 'name');
  const initialValues = mapValues(formByName, 'initialValue');
  const validationSchema = Yup.object().shape(mapValues(formByName, 'validationSchema'));

  const title = 'Добавление нового пользователя';
  const submitLabel = 'Добавить';
  const checkboxTitle = 'Добавленный пользователь будет иметь доступ к следующим компаниям:';
  const subscription =
    'Пользователь сможет управлять компаниями, но не сможет добавлять самостоятельно пользователей';

  const onSubmit = async ({ email }) => {
    const selectedCompanies = checkedCompanies.filter(({ checked }) => checked).map(({ id }) => id);

    try {
      await createCompanyMember({ email, companyIds: selectedCompanies });
      remove();
      onSuccess(true);
    } catch (error) {
      remove();
      onError(email);
    }
  };

  const form = {
    fields,
    title,
    checkboxTitle,
    submitLabel,
    subscription,
    initialValues,
    validationSchema,
    onSubmit,
  };

  return (
    <ModalWindow isOpen={visible} setIsOpen={remove} $width="26.5rem">
      <MemberForm
        form={form}
        checkedCompanies={checkedCompanies}
        companiesList={myCompanies}
        setCheckedCompanies={setCheckedCompanies}
      />
    </ModalWindow>
  );
});

export default CreateMemberModal;
