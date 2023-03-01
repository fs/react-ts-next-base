import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { useSignUp } from 'lib/apollo/hooks/actions/auth';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';

import { TFormValues } from './types';
import { FieldWrapper, FormContentWrapper, SubmitButtonWrapper } from './styled';

const passwordRegularExp =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])([0-9A-Za-z#$@&!?.*^{}<>;,)(~'"=_%+-]+)$/;

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const SignUpValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  email: Yup.string().email('Must be a valid email').max(255).required('This field is required'),
  password: Yup.string()
    .required('This field is required')
    .trim()
    .min(6, 'The minimum password length is 6 characters')
    .matches(
      passwordRegularExp,
      'Password must contain upper and lower case characters and numbers',
    ),
});

const SignUpForm = () => {
  const [signUp] = useSignUp();

  const onSubmit = async (values: TFormValues) => {
    await signUp(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={SignUpValidationSchema}
    >
      {({ isSubmitting }) => (
        <FormContentWrapper>
          <Form>
            <FieldWrapper>
              <Input
                name="firstName"
                testId="input-firstName"
                title="First Name"
                placeholder="First Name"
              />
            </FieldWrapper>
            <FieldWrapper>
              <Input
                name="lastName"
                testId="input-lastName"
                title="Last Name"
                placeholder="Last Name"
              />
            </FieldWrapper>
            <FieldWrapper>
              <Input
                name="email"
                testId="input-email"
                type="email"
                title="Email"
                placeholder="Email"
              />
            </FieldWrapper>
            <FieldWrapper>
              <Input
                name="password"
                testId="input-password"
                type="password"
                title="Password"
                placeholder="Password"
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
          </Form>
        </FormContentWrapper>
      )}
    </Formik>
  );
};

export default SignUpForm;
