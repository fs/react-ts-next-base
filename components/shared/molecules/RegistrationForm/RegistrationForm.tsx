import React from 'react';
import { Formik, Form as FormikForm } from 'formik';

import Button from 'components/shared/atoms/Button';
import Input from 'components/shared/atoms/Input';
import Checkbox from 'components/shared/atoms/Checkbox';
import ActionLink from 'components/shared/atoms/ActionLink';
import SupportRequestModal from 'components/shared/molecules/SupportRequestModal';
import PhoneVerificationForm from 'components/shared/organisms/PhoneVerificationForm';

import { useModal } from '@ebay/nice-modal-react';

import {
  LoginFormWrapper,
  ErrorWrapper,
  FormRow,
  FormCol,
  ActionsWrapper,
  CheckboxesWrapper,
} from './styled';
import { initialValues, validationSchema } from './fields';
import { TRegistrationFormContent } from './types';

const RegistrationForm = ({ action, checkboxes }: TRegistrationFormContent) => {
  const supportRequestModal = useModal(SupportRequestModal);

  const onSupportRequestLinkClick = async () => {
    await supportRequestModal.show({});
  };

  const checkboxesInitialValues = checkboxes.reduce(
    (obj, item) => ({ ...obj, [item.name]: false }),
    { [checkboxes[0].name]: false },
  );

  const checkboxesInitialError = checkboxes.reduce((obj, item) => ({ ...obj, [item.name]: '' }), {
    [checkboxes[0].name]: '',
  });

  const preparedInitialValues = {
    ...initialValues,
    checkboxes: checkboxesInitialValues,
  };

  return (
    <LoginFormWrapper data-cy="signup-form">
      <Formik
        enableReinitialize
        initialErrors={{ checkboxes: checkboxesInitialError }}
        initialValues={preparedInitialValues}
        validationSchema={validationSchema}
        onSubmit={action}
      >
        {({ isSubmitting, status, values, setFieldValue, errors }) => (
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
              type="email"
              name="email"
              testId="email"
              placeholder="e-mail"
              variant="underlined"
            />

            <Input
              type="text"
              name="phoneNumber"
              testId="phoneNumber"
              placeholder="Номер мобильного"
              variant="underlined"
            />

            <PhoneVerificationForm
              phoneNumber={values.phoneNumber}
              onSmsCodeChange={(val: string) => setFieldValue('smsCode', val)}
            />

            <Input
              type="password"
              name="password"
              testId="password"
              placeholder="Пароль"
              variant="underlined"
            />

            <CheckboxesWrapper>
              {checkboxes.map(({ name, label }) => (
                <Checkbox
                  key={name}
                  checked={values.checkboxes[name]}
                  name={name}
                  label={label}
                  onChange={value =>
                    setFieldValue('checkboxes', { ...values.checkboxes, [name]: value })
                  }
                />
              ))}
            </CheckboxesWrapper>

            <ActionLink $mt={10} size={16} $color="grey" onClick={onSupportRequestLinkClick}>
              Обратиться в поддержку
            </ActionLink>

            <ActionsWrapper>
              <Button
                type="submit"
                label="ПРИСОЕДИНИТЬСЯ"
                $width="12.5rem"
                testId="submit-button"
                isLoading={isSubmitting}
                disabled={isSubmitting || !!errors.checkboxes}
              />
            </ActionsWrapper>

            {!!status && <ErrorWrapper>{status}</ErrorWrapper>}
          </FormikForm>
        )}
      </Formik>
    </LoginFormWrapper>
  );
};

export default RegistrationForm;
