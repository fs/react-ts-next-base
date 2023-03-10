import React from 'react';
import * as Yup from 'yup';

import withFormik from 'storybook-formik';
import { ComponentStory } from '@storybook/react';
import { REQUIRED_FIELD } from 'config/constants/errorsText';

import NumberInput from '../index';
import { TNumberInputComponent } from '../types';

const inputName = 'input_name';
const initialArgs = {
  variant: 'default',
  suffix: ' кг.',
  prefix: '',
  decimalScale: 0,
  allowNegative: false,
  disabled: false,
  errorMessage: true,
  textAlign: 'left',
  title: 'Заголовок',
  placeholder: 'Плейсхолдер',
  readOnly: false,
  name: inputName,
};
const validationSchema = Yup.object().shape({
  [inputName]: Yup.number()
    .required(REQUIRED_FIELD)
    .min(10, 'минимум 10 кг.')
    .max(100, 'максимум 1000 кг.')
    .nullable(),
});

export default {
  title: 'atoms/NumberInput',
  component: NumberInput,
  argTypes: {
    name: {
      description: 'Name for Formik Field',
      control: {
        type: null,
      },
    },
    suffix: {
      description: 'Add a suffix after the number',
    },
    prefix: {
      description: 'Add a prefix before the number',
    },
    decimalScale: {
      description: 'It limits to given decimal scale',
    },
    allowNegative: {
      description: 'Allow negative numbers',
    },
    errorMessage: {
      description: 'Show error message',
    },
  },
  args: initialArgs,
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: { [inputName]: null },
      validationSchema,
      castValues: true,
    },
    docs: { disable: true },
  },
};

const Template: ComponentStory<typeof NumberInput> = args => {
  return <NumberInput {...args} />;
};

export const Demo = Template.bind({});

export const Variant = (agrs: TNumberInputComponent) => (
  <>
    <NumberInput {...agrs} variant="default" />
    <NumberInput {...agrs} variant="table_cell" />
  </>
);

export const Filled = (agrs: TNumberInputComponent) => (
  <>
    <NumberInput {...agrs} variant="default" />
    <NumberInput {...agrs} variant="table_cell" />
  </>
);
Filled.parameters = {
  formik: {
    initialValues: { [inputName]: 100 },
  },
};

export const Error = (agrs: TNumberInputComponent) => (
  <>
    <NumberInput {...agrs} $mb={20} variant="default" />
    <NumberInput {...agrs} variant="table_cell" />
  </>
);
Error.parameters = {
  formik: {
    initialErrors: { [inputName]: REQUIRED_FIELD },
    initialTouched: { [inputName]: true },
  },
};

export const Disabled = (agrs: TNumberInputComponent) => (
  <>
    <NumberInput {...agrs} variant="default" disabled />
    <NumberInput {...agrs} variant="table_cell" disabled />
  </>
);
