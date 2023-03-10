import React from 'react';
import { Form, Formik } from 'formik';

import { RECOVERY_PASSWORD } from 'config/routes';

import { useSignIn } from 'lib/apollo/hooks/actions/auth';

import Input from 'components/shared/atoms/Input';
import Button from 'components/shared/atoms/Button';
import ActionLink from 'components/shared/atoms/ActionLink';

import { TFormValues } from './types';
import { FormContentWrapper } from './styled';
import { initialValues, validationSchema } from './fields';

const SignInForm = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values: TFormValues) => {
    await signIn(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ isSubmitting }) => (
        <Form>
          <FormContentWrapper>
            <Input
              name="email"
              type="email"
              title="Email"
              placeholder="Email"
              testId="input-email"
            />
            <Input
              name="password"
              type="password"
              title="Password"
              placeholder="Password"
              testId="input-password"
            />
            <Button
              type="submit"
              testId="submit-button"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              label="Submit"
              $mt={16}
              $mb={16}
            />

            <div>
              <ActionLink href={RECOVERY_PASSWORD} label="Forgot your password?" />
            </div>
          </FormContentWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
