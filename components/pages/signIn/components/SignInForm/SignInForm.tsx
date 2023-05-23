import * as Yup from 'yup';

import { useSignIn } from 'lib/apollo/hooks/actions/auth';

import {
  EMAIL_INVALID,
  PASSWORD_INVALID_FORMAT,
  PASSWORD_INVALID_LENGTH,
  REQUIRED_FIELD,
} from 'config/constants/errorsText';
import { RECOVERY_PASSWORD } from 'config/routes';
import { PASSWORD_REGULAR_EXP } from 'config/constants/regularExpressions';

import ActionLink from 'components/shared/atoms/ActionLink';
import Form, { FormFieldType } from 'components/shared/molecules/Form';

import { TFormValues } from './types';

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
          .matches(PASSWORD_REGULAR_EXP, PASSWORD_INVALID_FORMAT),
      },
      {
        type: FormFieldType.submit,
        name: 'Submit',
        testId: 'submit-button',
      },
    ],
    onSubmit: async (values: TFormValues) => {
      await signIn(values);
    },
  };

  return (
    <div>
      <Form form={form} $width="20rem" />
      <ActionLink href={RECOVERY_PASSWORD} label="Forgot your password?" />
    </div>
  );
};

export default SignInForm;
