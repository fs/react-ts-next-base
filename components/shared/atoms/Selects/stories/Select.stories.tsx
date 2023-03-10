import React from 'react';
import withFormik from 'storybook-formik';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as Yup from 'yup';
import { REQUIRED_FIELD } from 'config/constants/errorsText';

import SelectField from '../SelectField';

const inputName = 'input_name';
const initialOptions = [
  { value: '1', label: 'Первый' },
  { value: '2', label: 'Второй' },
  { value: '3', label: 'Третий' },
  { value: '4', label: 'Четвертый' },
  { value: '5', label: 'Пятый' },
  { value: '6', label: 'Шестой' },
];

const validationSchema = Yup.object().shape({
  [inputName]: Yup.string().required(REQUIRED_FIELD).nullable(),
});

export default {
  title: 'atoms/SelectField',
  component: SelectField,
  argTypes: {
    height: {
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      description: 'Name for Formik Field',
      control: {
        type: null,
      },
    },
  },
  args: {
    variant: 'default',
    rounded: false,
    isMulti: false,
    controlShouldRenderValue: true,
    closeMenuOnSelect: true,
    hideSelectedOptions: true,
    isClearable: true,
    showError: true,
    disabled: false,
    height: '11rem',
    title: 'Заголовок',
    placeholder: 'Плейсхолдер',
    options: initialOptions,
    name: inputName,
    $mb: 20,
  },
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: { [inputName]: '' },
      validationSchema,
      castValues: true,
    },
    docs: { disable: true },
  },
} as ComponentMeta<typeof SelectField>;

export const Demo: ComponentStory<typeof SelectField> = args => <SelectField {...args} />;

export const Variant: ComponentStory<typeof SelectField> = args => (
  <>
    <SelectField {...args} variant="default" />
    <SelectField {...args} variant="table-cell" />
  </>
);

export const Filled: ComponentStory<typeof SelectField> = args => (
  <>
    <SelectField {...args} variant="default" />
    <SelectField {...args} variant="table-cell" />
  </>
);
Filled.parameters = {
  formik: {
    initialValues: { [inputName]: '3' },
  },
};

export const Error: ComponentStory<typeof SelectField> = args => (
  <>
    <SelectField {...args} variant="default" />
    <SelectField {...args} variant="table-cell" />
  </>
);
Error.parameters = {
  formik: {
    initialErrors: { [inputName]: REQUIRED_FIELD },
    initialTouched: { [inputName]: true },
  },
};

export const Disabled: ComponentStory<typeof SelectField> = args => (
  <>
    <SelectField {...args} variant="default" disabled />
    <SelectField {...args} variant="table-cell" disabled />
  </>
);
