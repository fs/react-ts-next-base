import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form as FormikForm } from 'formik';
import Link from 'next/link';

import { useJoinUser } from 'lib/apollo/hooks/actions/joinUser';

import { phoneRegularExp } from 'config/constants/regularExpressions';
import { PHONE_INVALID, REQUIRED_FIELD } from 'config/constants/errorsText';

import { AGREEMENT } from 'config/routes';
import useNotifier from 'hooks/useNotifier';

import Button from 'components/shared/atoms/Button';
import Input from 'components/shared/atoms/Input';
import Checkbox from 'components/shared/atoms/Checkbox';
import ActionLink from 'components/shared/atoms/ActionLink';
import SupportRequestModal from 'components/shared/molecules/SupportRequestModal';
import PhoneVerificationForm from 'components/shared/organisms/PhoneVerificationForm';

import { useModal } from '@ebay/nice-modal-react';
import { ErrorWrapper, FormRow, FormCol, CheckboxesWrapper } from './styled';

const JoinUserFormContent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState(undefined);
  const [isAgreementAccepted, setIsAgreementAccepted] = useState(false);

  const [joinUser] = useJoinUser();
  const { setError } = useNotifier();

  const supportRequestModal = useModal(SupportRequestModal);
  const onSupportRequestLinkClick = async () => {
    await supportRequestModal.show({});
  };

  const onChangePhoneNumber = (val, setFieldValue) => {
    const number = val.target.value;
    setFieldValue('phoneNumber', number);
    setPhoneNumber(number);
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await joinUser({ ...values, smsCode });
    } catch (error) {
      setSubmitting(false);
      setError(error);
    }
  };

  const checkboxes = [
    {
      name: 'agreement',
      label: (
        <Link href={AGREEMENT} target="_blank" rel="noreferrer">
          Соглашение с политикой обработки персональных данных
        </Link>
      ),
      onChange: setIsAgreementAccepted,
      checked: isAgreementAccepted,
    },
  ];

  const initialValues = {
    lastName: '',
    firstName: '',
    middleName: '',
    phoneNumber: '+7',
  };

  const validationSchema = Yup.object().shape({
    lastName: Yup.string().required(REQUIRED_FIELD),
    firstName: Yup.string().required(REQUIRED_FIELD),
    middleName: Yup.string(),
    phoneNumber: Yup.string().matches(phoneRegularExp, PHONE_INVALID).required(REQUIRED_FIELD),
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, status, setFieldValue }) => (
          <FormikForm>
            <FormRow>
              <FormCol>
                <Input
                  type="text"
                  name="lastName"
                  testId="lastName"
                  placeholder="Фамилия"
                  variant="underlined"
                />
              </FormCol>
              <FormCol>
                <Input
                  type="text"
                  name="firstName"
                  testId="firstName"
                  placeholder="Имя"
                  variant="underlined"
                />
              </FormCol>
              <FormCol>
                <Input
                  type="text"
                  name="middleName"
                  testId="middleName"
                  placeholder="Отчество"
                  variant="underlined"
                />
              </FormCol>
            </FormRow>

            <Input
              type="text"
              name="phoneNumber"
              testId="phoneNumber"
              placeholder="Номер мобильного"
              onChange={val => onChangePhoneNumber(val, setFieldValue)}
              variant="underlined"
            />

            <PhoneVerificationForm phoneNumber={phoneNumber} onSmsCodeChange={setSmsCode} />

            <CheckboxesWrapper>
              {checkboxes.map(({ name, label, onChange, checked }) => (
                <Checkbox
                  key={name}
                  name={name}
                  label={label}
                  onChange={onChange}
                  checked={checked}
                />
              ))}
            </CheckboxesWrapper>

            <div>
              <ActionLink $color="grey" onClick={onSupportRequestLinkClick} size={14}>
                Обратиться в поддержку
              </ActionLink>
            </div>

            <Button
              label="ПРИСОЕДИНИТЬСЯ"
              $width="12.5rem"
              type="submit"
              testId="submit-button"
              isLoading={isSubmitting}
              disabled={isSubmitting || !isAgreementAccepted}
              $mt={24}
            />

            {!!status && <ErrorWrapper>{status}</ErrorWrapper>}
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default JoinUserFormContent;
