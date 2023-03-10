import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import Radio from '../index';
import { EDirection } from '../types';
import { Wrapper } from './styled';

export default {
  title: 'atoms/Radio',
  component: Radio,
  argTypes: {
    direction: {
      control: { type: 'select' },
      table: {
        defaultValue: { summary: EDirection.COLUMN },
      },
    },
    options: { description: 'Radio input options' },
    selected: { description: 'Current selected value' },
    boldSelectedValue: {
      description: 'Make selected value label bold',
      table: {
        defaultValue: { summary: false },
      },
    },
    name: {
      control: {
        type: null,
      },
      description: 'Input name',
    },
    setFieldValue: {
      control: {
        type: null,
      },
    },
    onChange: {
      control: {
        type: null,
      },
    },
  },
  args: {
    options: [
      { label: 'True', value: true },
      { label: 'False', value: false },
    ],
    selected: true,
    boldSelectedValue: false,
    readOnly: false,
    name: 'radio-input',
  },
} as ComponentMeta<typeof Radio>;

export const Demo: ComponentStory<typeof Radio> = args => {
  const [{ selected }, updateArgs] = useArgs();
  const handleChange = (value: boolean | string | number) => updateArgs({ selected: value });

  return <Radio {...args} onChange={handleChange} selected={selected} />;
};

export const Variant: ComponentStory<typeof Radio> = args => {
  const [{ selected }, updateArgs] = useArgs();
  const handleChange = (value: boolean | string | number) => updateArgs({ selected: value });

  return (
    <Wrapper>
      <Radio {...args} onChange={handleChange} selected={selected} direction="column" />
      <Radio
        {...args}
        onChange={handleChange}
        boldSelectedValue
        selected={selected}
        direction="row"
      />
    </Wrapper>
  );
};
