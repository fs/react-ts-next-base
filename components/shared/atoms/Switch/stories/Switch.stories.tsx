import React from 'react';
import withFormik from 'storybook-formik';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Switch from '../index';

export default {
  title: 'atoms/Switch',
  component: Switch,
  argTypes: {
    name: {
      control: {
        type: null,
      },
      description: 'Input name',
    },
  },
  decorators: [withFormik],
  parameters: {
    docs: { disable: true },
  },
  args: {
    name: 'switch-input',
  },
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = args => {
  return <Switch {...args} />;
};
export const Demo = Template.bind({});
