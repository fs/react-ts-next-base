import React from 'react';
import { Form, Formik } from 'formik';

import { useSignUp } from 'lib/apollo/hooks/actions/auth';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';

import { TFormValues } from './types';
import { FormContentWrapper } from './styled';
import { initialValues, validationSchema } from './fields';

const SignUpForm = () => {
  const [signUp] = useSignUp();

  const onSubmit = async (values: TFormValues) => {
    await signUp(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ isSubmitting }) => (
        <FormContentWrapper>
          <Form>
            <Input
              name="firstName"
              testId="input-firstName"
              title="First Name"
              placeholder="First Name"
            />
            <Input
              name="lastName"
              testId="input-lastName"
              title="Last Name"
              placeholder="Last Name"
            />
            <Input
              name="email"
              testId="input-email"
              type="email"
              title="Email"
              placeholder="Email"
            />
            <Input
              name="password"
              testId="input-password"
              type="password"
              title="Password"
              placeholder="Password"
            />
            <Button
              type="submit"
              testId="submit-button"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              label="Submit"
              $mt={16}
            />
          </Form>
        </FormContentWrapper>
      )}
    </Formik>
  );
};

export default SignUpForm;
