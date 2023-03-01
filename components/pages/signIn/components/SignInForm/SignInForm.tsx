import React from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { Form, Formik } from 'formik';

import { RECOVERY_PASSWORD } from 'config/routes';

import { useSignIn } from 'lib/apollo/hooks/actions/auth';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';

import { TFormValues } from './types';
import { FieldWrapper, FormContentWrapper, SubmitButtonWrapper } from './styled';

const initialValues = {
  email: '',
  password: '',
};

const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('This field is required'),
  password: Yup.string().required('This field is required'),
});

const SignInForm = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values: TFormValues) => {
    await signIn(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={SignInValidationSchema}
    >
      {({ isSubmitting }) => (
        <FormContentWrapper>
          <Form>
            <FieldWrapper>
              <Input
                name="email"
                type="email"
                title="Email"
                placeholder="Email"
                testId="input-email"
              />
            </FieldWrapper>
            <FieldWrapper>
              <Input
                name="password"
                type="password"
                title="Password"
                placeholder="Password"
                testId="input-password"
              />
            </FieldWrapper>
            <SubmitButtonWrapper>
              <Button
                type="submit"
                testId="submit-button"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                label="Submit"
              />
            </SubmitButtonWrapper>

            <FieldWrapper>
              <Link href={RECOVERY_PASSWORD} passHref>
                Forgot your password?
              </Link>
            </FieldWrapper>
          </Form>
        </FormContentWrapper>
      )}
    </Formik>
  );
};

export default SignInForm;
