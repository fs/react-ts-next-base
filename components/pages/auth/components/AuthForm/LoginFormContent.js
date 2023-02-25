import React from 'react';
import * as Yup from 'yup';
import { Formik, Form as FormikForm } from 'formik';

import { RESET_PASSWORD } from 'config/routes';
import { useSignIn } from 'lib/apollo/hooks/actions/auth';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import ActionLink from 'components/shared/atoms/ActionLink';
import SupportRequestModal from 'components/shared/molecules/SupportRequestModal';

import { emailRegularExpression } from 'config/constants/regularExpressions';
import { REQUIRED_FIELD } from 'config/constants/errorsText';

import { useModal } from '@ebay/nice-modal-react';
import {
  Wrapper,
  LoginFormWrapper,
  LoginInputsWrapper,
  ErrorWrapper,
  ActionsWrapper,
} from './styled';

const LoginForm = () => {
  const [signIn] = useSignIn();
  const supportRequestModal = useModal(SupportRequestModal);

  const onSupportRequestLinkClick = async () => {
    await supportRequestModal.show({});
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      await signIn(values);

      setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  const initialValues = {
    login: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .required(REQUIRED_FIELD)
      .test('login-check', 'Введите валидный email', value => {
        const isValidEmail = emailRegularExpression.test(value);

        return isValidEmail;
      }),
    password: Yup.string().required(REQUIRED_FIELD),
  });

  return (
    <Wrapper className="tab">
      <LoginFormWrapper data-cy="signin-form">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, status }) => (
            <FormikForm>
              <LoginInputsWrapper>
                <Input
                  type="login"
                  name="login"
                  testId="login"
                  placeholder="Введите email"
                  variant="underlined"
                />

                <Input
                  type="password"
                  name="password"
                  testId="password"
                  placeholder="Пароль"
                  variant="underlined"
                />
              </LoginInputsWrapper>

              <ActionLink label="Забыли пароль?" href={RESET_PASSWORD} size={16} />

              <ActionLink
                label="Обратиться в поддержку"
                $mt={16}
                size={16}
                $color="grey"
                onClick={onSupportRequestLinkClick}
              />

              <ActionsWrapper>
                <Button
                  type="submit"
                  label="ВОЙТИ"
                  $width="12.5rem"
                  testId="submit-button"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                />
              </ActionsWrapper>

              {!!status && <ErrorWrapper>{status}</ErrorWrapper>}
            </FormikForm>
          )}
        </Formik>
      </LoginFormWrapper>
    </Wrapper>
  );
};

export default LoginForm;
