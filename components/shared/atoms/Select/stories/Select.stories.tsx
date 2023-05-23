import { ComponentMeta, ComponentStory } from '@storybook/react';

import Select from '../Select';

const inputName = 'input_name';
const initialOptions = [
  { value: '1', label: 'First' },
  { value: '2', label: 'Second' },
  { value: '3', label: 'Third' },
  { value: '4', label: 'Fourth' },
  { value: '5', label: 'Fifth' },
  { value: '6', label: 'Sixth' },
];

export default {
  title: 'atoms/Select',
  component: Select,
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
    rounded: false,
    isMulti: false,
    controlShouldRenderValue: true,
    closeMenuOnSelect: true,
    hideSelectedOptions: true,
    isClearable: true,
    disabled: false,
    height: '11rem',
    title: 'Title',
    placeholder: 'Placeholder',
    options: initialOptions,
    name: inputName,
    $mb: 20,
  },
} as ComponentMeta<typeof Select>;

export const Demo: ComponentStory<typeof Select> = args => <Select {...args} />;

export const Filled: ComponentStory<typeof Select> = args => (
  <Select {...args} value={initialOptions[4]} />
);

export const Error: ComponentStory<typeof Select> = args => (
  <Select {...args} error="error message" />
);

export const Disabled: ComponentStory<typeof Select> = args => <Select {...args} disabled />;
