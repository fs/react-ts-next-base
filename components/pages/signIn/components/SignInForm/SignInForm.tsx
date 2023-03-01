import React from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { Form, Formik, FormikProps } from 'formik';

import { RECOVERY_PASSWORD } from 'config/routes';

import { useSignIn } from 'lib/apollo/hooks/actions/auth';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import Loader from 'components/shared/atoms/Loader';

import { FieldWrapper, FormContentWrapper, SubmitButtonWrapper } from './styled';

const initialValues = {
  email: '',
  password: '',
};

const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('This field is required'),
  password: Yup.string().required('This field is required'),
});

type ValuesFromFormik = Parameters<ReturnType<typeof useSignIn>[0]>[0];

const SignInFormContent = ({ isSubmitting }: FormikProps<ValuesFromFormik>) => (
  <FormContentWrapper>
    <Form>
      <FieldWrapper>
        <Input name="email" type="email" title="Email" />
      </FieldWrapper>
      <FieldWrapper>
        <Input name="password" type="password" title="Password" />
      </FieldWrapper>
      <SubmitButtonWrapper>
        <Button type="submit" testId="submit-button" disabled={isSubmitting}>
          Submit
        </Button>
      </SubmitButtonWrapper>

      <FieldWrapper>
        <Link href={RECOVERY_PASSWORD} passHref>
          Forgot your password?
        </Link>
      </FieldWrapper>
    </Form>
  </FormContentWrapper>
);

const SignInForm = () => {
  const [signIn, signInResult] = useSignIn();

  const onSubmit = async (values: ValuesFromFormik) => {
    await signIn(values);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        component={SignInFormContent}
        validationSchema={SignInValidationSchema}
      />
      {signInResult.loading && <Loader testId="signin-loader" />}
    </>
  );
};

export default SignInForm;
