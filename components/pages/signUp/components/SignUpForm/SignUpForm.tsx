import * as Yup from 'yup';

import { useSignUp } from 'lib/apollo/hooks/actions/auth';

import {
  EMAIL_INVALID,
  PASSWORD_INVALID_FORMAT,
  PASSWORD_INVALID_LENGTH,
  REQUIRED_FIELD,
} from 'config/constants/errorsText';
import { PASSWORD_REGULAR_EXP } from 'config/constants/regularExpressions';

import Form, { FormFieldType } from 'components/shared/molecules/Form';

import { TFormValues } from './types';

const SignUpForm = () => {
  const [signUp] = useSignUp();

  const form = {
    fields: [
      {
        type: FormFieldType.text,
        name: 'firstName',
        title: 'First Name',
        placeholder: 'First Name',
        testId: 'input-firstName',
        initialValue: '',
        validationSchema: Yup.string().required(REQUIRED_FIELD),
      },
      {
        type: FormFieldType.text,
        name: 'lastName',
        title: 'Last Name',
        placeholder: 'Last Name',
        testId: 'input-lastName',
        initialValue: '',
        validationSchema: Yup.string().required(REQUIRED_FIELD),
      },
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
      await signUp(values);
    },
  };

  return <Form form={form} $width="20rem" />;
};

export default SignUpForm;
