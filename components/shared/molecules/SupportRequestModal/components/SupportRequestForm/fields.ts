import * as Yup from 'yup';
import { EMAIL_INVALID, REQUIRED_FIELD } from 'config/constants/errorsText';

export const fields = [
  {
    type: 'text',
    name: 'subject',
    testId: 'subject',
    title: 'Тема обращения',
    placeholder: 'Тема обращения',
  },
  {
    type: 'textarea',
    name: 'message',
    testId: 'message',
    title: 'Текст обращения',
    placeholder: 'Текст обращения',
  },
];

export const publicFields = [
  {
    type: 'email',
    name: 'email',
    testId: 'email',
    title: 'Email',
    placeholder: 'Email',
  },
  ...fields,
];

export const initialValues = (subject: string) => ({
  subject,
  message: '',
});

export const publicInitialValues = (subject: string) => ({
  subject,
  message: '',
  email: '',
});

export const validation = {
  subject: Yup.string().required(REQUIRED_FIELD),
  message: Yup.string().required(REQUIRED_FIELD),
};

export const publicValidation = {
  ...validation,
  email: Yup.string().email(EMAIL_INVALID).required(REQUIRED_FIELD),
};
