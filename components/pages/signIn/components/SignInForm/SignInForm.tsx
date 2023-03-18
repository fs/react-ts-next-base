import React from 'react';
import * as Yup from 'yup';

import { useSignIn } from 'lib/apollo/hooks/actions/auth';

import {
  EMAIL_INVALID,
  PASSWORD_INVALID_FORMAT,
  PASSWORD_INVALID_LENGTH,
  REQUIRED_FIELD,
} from 'config/constants/errorsText';
import { passwordRegularExp } from 'config/constants/regularExpressions';
import { RECOVERY_PASSWORD } from 'config/routes';

import ActionLink from 'components/shared/atoms/ActionLink';
import Form from 'components/shared/molecules/Form';
import { FormFieldType } from 'components/shared/molecules/Form/types';

import { TFormValues } from './types';
import { SignInFormWrapper } from './styled';

const SignInForm = () => {
  const [signIn] = useSignIn();

  const form = {
    fields: [
      {
        type: FormFieldType.text,
        name: 'email',
        title: 'Email',
        placeholder: 'Email',
        testId: 'input-email',
        initialValue: '',
        validationSchema: Yup.string().email(EMAIL_INVALID).max(255).required(REQUIRED_FIELD),
      },
      {
        type: FormFieldType.password,
        name: 'password',
        title: 'Password',
        placeholder: 'Password',
        testId: 'input-password',
        initialValue: '',
        validationSchema: Yup.string()
          .required(REQUIRED_FIELD)
          .trim()
          .min(6, PASSWORD_INVALID_LENGTH)
          .matches(passwordRegularExp, PASSWORD_INVALID_FORMAT),
      },
      {
        type: FormFieldType.submit,
        name: 'submit',
        title: 'First Name',
        placeholder: 'First Name',
        testId: 'submit-button',
      },
    ],
    onSubmit: async (values: TFormValues) => {
      await signIn(values);
    },
  };

  return (
    <SignInFormWrapper>
      <Form form={form} />
      <ActionLink href={RECOVERY_PASSWORD} label="Forgot your password?" />
    </SignInFormWrapper>
  );
};

export default SignInForm;
