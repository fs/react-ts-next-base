import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import withFormik from 'storybook-formik';

import { ESize } from 'public/styles/config/size';

import { EShape } from '../types';
import Counter from '../index';

import { Row } from './styled';

const fieldName = 'counter_name';
export default {
  title: 'molecules/Counter',
  component: Counter,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.values(ESize),
    },
    shape: {
      control: { type: 'select' },
      options: Object.values(EShape),
    },
    name: {
      control: {
        type: null,
      },
    },
  },
  args: {
    min: 1,
    max: 10,
    size: 'medium',
    shape: 'none',
    $width: '10rem',
    disabled: false,
    name: fieldName,
    onChange: () => {},
  },
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: { [fieldName]: 5 },
      castValues: true,
    },
    docs: { disable: true },
  },
} as ComponentMeta<typeof Counter>;

export const Demo: ComponentStory<typeof Counter> = args => {
  return <Counter {...args} />;
};

export const Disabled: ComponentStory<typeof Counter> = args => {
  return <Counter {...args} disabled />;
};

export const Size: ComponentStory<typeof Counter> = args => {
  return (
    <Row>
      <Counter {...args} size="extra-small" />
      <Counter {...args} size="small" />
      <Counter {...args} size="medium" />
      <Counter {...args} size="large" />
      <Counter {...args} size="extra-large" />
    </Row>
  );
};

export const Shape: ComponentStory<typeof Counter> = args => {
  return (
    <Row>
      <Counter {...args} shape="none" />
      <Counter {...args} shape="rounded" />
      <Counter {...args} shape="extra-rounded" />
    </Row>
  );
};
