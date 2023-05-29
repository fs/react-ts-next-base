import withFormik from 'storybook-formik';
import * as Yup from 'yup';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { REQUIRED_FIELD } from 'config/constants/errorsText';

import Icon from 'components/shared/atoms/Icon';

import Input from '../index';
import { TInput } from '../types';

const inputName = 'input_name';
const validationSchema = Yup.object().shape({
  [inputName]: Yup.string().required(REQUIRED_FIELD).max(10),
});

export default {
  title: 'atoms/Input',
  component: Input,
  argTypes: {
    type: {
      options: ['text', 'textarea', 'password'],
      control: {
        type: 'radio',
      },
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
    rounded: {
      description: '`border-radius: 0.375rem` to input',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    variant: 'default',
    rounded: false,
    disabled: false,
    width: '100%',
    textAlign: 'left',
    title: 'Title',
    placeholder: 'Placeholder',
    iconType: 'none',
    type: 'text',
    name: inputName,
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
} as ComponentMeta<typeof Input>;

export const Demo: ComponentStory<typeof Input> = (args: TInput) => {
  return <Input {...args} />;
};

export const Variant = (args: TInput) => (
  <>
    <Input {...args} variant="default" />
    <Input {...args} variant="secondary" />
  </>
);

export const Filled = (args: TInput) => (
  <>
    <Input {...args} variant="default" />
    <Input {...args} variant="secondary" />
  </>
);
Filled.parameters = {
  formik: {
    initialValues: { [inputName]: 'Text' },
  },
};

export const Error = (args: TInput) => (
  <>
    <Input {...args} variant="default" />
    <Input {...args} variant="secondary" />
  </>
);
Error.parameters = {
  formik: {
    initialErrors: { [inputName]: REQUIRED_FIELD },
    initialTouched: { [inputName]: true },
  },
};

export const Disabled = (args: TInput) => (
  <>
    <Input {...args} variant="default" disabled />
    <Input {...args} variant="secondary" disabled />
  </>
);

export const Type = (args: TInput) => (
  <>
    <Input {...args} name="input_1" type="text" />
    <Input {...args} name="input_2" type="password" />
    <Input {...args} name="input_3" type="textarea" />
  </>
);

export const TextAlign = (args: TInput) => (
  <>
    <Input {...args} name="input_1" variant="secondary" textAlign="left" />
    <Input {...args} name="input_2" variant="secondary" textAlign="center" />
    <Input {...args} name="input_3" variant="secondary" textAlign="right" />
  </>
);

export const WithIcon = (args: TInput) => (
  <>
    <Input
      {...args}
      iconType="leading"
      icon={<Icon name="plus" $color="grey_600" $ml={12} $size={16} />}
    />
    <Input
      {...args}
      iconType="trailing"
      icon={<Icon name="plus" $color="grey_600" $mr={12} $size={16} />}
    />
  </>
);
