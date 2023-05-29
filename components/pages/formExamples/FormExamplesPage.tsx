import * as Yup from 'yup';

import { REQUIRED_FIELD } from 'config/constants/errorsText';

import Form, { FormFieldType, PasswordAutocomplete } from 'components/shared/molecules/Form';

const form = {
  fields: [
    {
      type: FormFieldType.text,
      name: 'text',
      title: 'Name',
      placeholder: 'Type here',
      initialValue: '',
      validationSchema: Yup.string().required('This field is required'),
    },
    {
      type: FormFieldType.email,
      name: 'email',
      title: 'E-mail',
      placeholder: 'your email',
      initialValue: '',
      validationSchema: Yup.string()
        .email('The email must be valid!!')
        .required('This field is required'),
    },
    {
      type: FormFieldType.password,
      name: 'password',
      placeholder: 'password',
      initialValue: '',
      autoComplete: PasswordAutocomplete.newPassword,
    },
    {
      type: FormFieldType.text,
      name: 'text2',
      placeholder: 'Type here 2',
      initialValue: '222',
    },
    {
      type: FormFieldType.textarea,
      name: 'textarea',
      placeholder: 'Type here 3',
      initialValue: '3333',
    },
    {
      type: FormFieldType.select,
      name: 'select',
      initialValue: 2,
      options: [
        { label: 'chose 1', value: 1 },
        { label: 'chose 2', value: 2 },
      ],
    },
    {
      type: FormFieldType.checkbox,
      name: 'checkbox',
      label: 'check it',
      initialValue: true,
      validationSchema: Yup.string().required(REQUIRED_FIELD),
    },
    {
      type: FormFieldType.submit,
      name: 'submit',
      initialValue: 'submit it',
    },
  ],
  // eslint-disable-next-line no-console
  onSubmit: (values: object) => console.log(values),
};

const FormExamples = () => {
  return (
    <div>
      <h1>Form examples</h1>
      <Form form={form} $width="20rem" />
    </div>
  );
};

export default FormExamples;
