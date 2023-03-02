import React from 'react';
import * as Yup from 'yup';

import Form from 'components/shared/molecules/Form';
import { REQUIRED_FIELD } from 'config/constants/errorsText';

const form = {
  fields: [
    {
      type: 'text',
      name: 'text',
      title: 'Name',
      placeholder: 'Type here',
      initialValue: '',
      validationSchema: Yup.string().required('This field is required'),
    },
    {
      type: 'email',
      name: 'email',
      title: 'E-mail',
      placeholder: 'your email',
      initialValue: '',
      validationSchema: Yup.string()
        .email('The email must be valid!!')
        .required('This field is required'),
    },
    {
      type: 'text',
      name: 'text2',
      placeholder: 'Type here 2',
      initialValue: '222',
    },
    {
      type: 'textarea',
      name: 'textarea',
      placeholder: 'Type here 3',
      initialValue: '3333',
    },
    {
      type: 'select',
      name: 'select',
      initialValue: 2,
      options: [
        { label: 'chose 1', value: 1 },
        { label: 'chose 2', value: 2 },
      ],
    },
    {
      type: 'checkbox',
      name: 'checkbox',
      label: 'check it',
      initialValue: true,
      validationSchema: Yup.string().required(REQUIRED_FIELD),
    },
    {
      type: 'button',
      name: 'button',
      initialValue: 'check it',
      // eslint-disable-next-line no-console
      onClick: () => console.log('check it'),
    },
    {
      type: 'submit',
      name: 'submit',
      initialValue: 'submit it',
    },
  ],
  // eslint-disable-next-line no-console
  submit: (values: object) => console.log(values),
};

const FormExamples = () => {
  return (
    <div>
      <h1>Form examples</h1>
      <Form form={form} />
    </div>
  );
};

export default FormExamples;
