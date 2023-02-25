import React from 'react';
import * as Yup from 'yup';
import { Formik, Form as FormikForm } from 'formik';

import {
  PASSWORD_INVALID_FORMAT,
  PASSWORD_MATCH,
  REQUIRED_FIELD,
} from 'config/constants/errorsText';
import { passwordRegularExp } from 'config/constants/regularExpressions';
import { useUpdateUserPassword } from 'lib/apollo/hooks/actions/currentUser';
import useNotifier from 'hooks/useNotifier';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';

import { Wrapper, InputsWrapper, PasswordRules } from './styled';

const EditPassword = () => {
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  };

  const [updatePassword] = useUpdateUserPassword();
  const { setError } = useNotifier();

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(REQUIRED_FIELD),
    newPassword: Yup.string()
      .matches(passwordRegularExp, PASSWORD_INVALID_FORMAT)
      .required(REQUIRED_FIELD),
    newPasswordConfirm: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], PASSWORD_MATCH)
      .required(REQUIRED_FIELD),
  });

  const onSubmit = async (
    { currentPassword, newPassword: password },
    { setSubmitting, resetForm },
  ) => {
    setSubmitting(true);

    try {
      const updatedUser = await updatePassword({ currentPassword, password });

      if (updatedUser) resetForm(initialValues);
    } catch (error) {
      setError(error);
    }

    setSubmitting(false);
  };

  return (
    <Wrapper>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values }) => (
          <FormikForm>
            <InputsWrapper>
              <Input
                variant="secondary"
                textAlign="center"
                type="password"
                name="currentPassword"
                testId="currentPassword"
                placeholder="Старый пароль"
              />
              <PasswordRules>Пароль должен содержать заглавную букву, символ и цифру</PasswordRules>
              <Input
                variant="secondary"
                textAlign="center"
                type="password"
                name="newPassword"
                testId="newPassword"
                placeholder="Новый пароль"
              />
              <Input
                variant="secondary"
                textAlign="center"
                type="password"
                name="newPasswordConfirm"
                testId="newPasswordConfirm"
                placeholder="Еще раз новый пароль"
              />
            </InputsWrapper>

            <Button
              label="Подтвердить"
              type="submit"
              $width="100%"
              testId="submit-button"
              isLoading={isSubmitting}
              disabled={isSubmitting || Object.values(values).some(value => !value)}
            />
          </FormikForm>
        )}
      </Formik>
    </Wrapper>
  );
};

export default EditPassword;
