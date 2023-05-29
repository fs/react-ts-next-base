import * as Yup from 'yup';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { REQUIRED_FIELD } from 'config/constants/errorsText';

import { PasswordAutocomplete } from '../formFields/types';
import Form from '../index';
import { FormFieldType } from '../types';

export default {
  title: 'molecules/Form',
  component: Form,
  args: {
    form: {
      fields: [
        {
          type: FormFieldType.select,
          title: 'select',
          name: 'select',
          initialValue: 2,
          options: [
            { label: 'chose 1', value: 1 },
            { label: 'chose 2', value: 2 },
          ],
        },
        {
          type: FormFieldType.checkbox,
          title: 'checkbox',
          name: 'checkbox',
          label: 'check it',
          initialValue: true,
          validationSchema: Yup.string().required(REQUIRED_FIELD),
        },
        {
          type: FormFieldType.text,
          name: 'text',
          title: 'text',
          placeholder: 'Type here',
          initialValue: '',
          validationSchema: Yup.string().required('This field is required'),
        },
        {
          type: FormFieldType.password,
          title: 'password',
          name: 'password',
          placeholder: 'password',
          initialValue: '',
          autoComplete: PasswordAutocomplete.newPassword,
        },
        {
          type: FormFieldType.textarea,
          title: 'textarea',
          name: 'textarea',
          placeholder: 'Type here 3',
          initialValue: '3333',
        },
        {
          type: FormFieldType.file,
          title: 'file',
          name: 'file',
          placeholder: 'Type here 2',
        },
        {
          type: FormFieldType.email,
          name: 'email',
          title: 'email',
          placeholder: 'your email',
          initialValue: '',
          validationSchema: Yup.string()
            .email('The email must be valid!!')
            .required('This field is required'),
        },
        {
          type: FormFieldType.submit,
          name: 'submit',
          initialValue: 'submit it',
        },
      ],
      onSubmit: () => {},
    },
  },
} as ComponentMeta<typeof Form>;

export const Demo: ComponentStory<typeof Form> = args => <Form {...args} />;
