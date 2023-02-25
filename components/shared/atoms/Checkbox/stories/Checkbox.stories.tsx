import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import Checkbox from '../index';
import { EPosition, EVariant } from '../types';

export default {
  title: 'atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    variant: {
      control: { type: 'select' },
      table: {
        defaultValue: { summary: EVariant.DEFAULT },
      },
    },
    position: {
      control: { type: 'select' },
      table: {
        defaultValue: { summary: EPosition.LEFT },
      },
    },
    label: { description: 'text in checkbox' },
    checked: { description: 'checked input' },
    name: {
      control: {
        type: null,
      },
    },
  },
  args: {
    checked: false,
    variant: 'default',
    position: 'left',
    label: 'checkbox label',
    name: 'checkbox_name',
    onChange: () => {},
    readOnly: false,
  },
} as ComponentMeta<typeof Checkbox>;

export const Demo: ComponentStory<typeof Checkbox> = args => {
  const [{ checked }, updateArgs] = useArgs();
  const handleChange = (value: boolean) => updateArgs({ checked: value });

  return <Checkbox {...args} onChange={handleChange} checked={checked} />;
};

export const Variant: ComponentStory<typeof Checkbox> = args => {
  const [{ checked }, updateArgs] = useArgs();
  const handleChange = (value: boolean) => updateArgs({ checked: value });

  return (
    <>
      <Checkbox {...args} onChange={handleChange} checked={checked} variant="default" />
      <Checkbox {...args} onChange={handleChange} checked={checked} variant="plus" />
    </>
  );
};

export const Right: ComponentStory<typeof Checkbox> = args => {
  const [{ checked }, updateArgs] = useArgs();
  const handleChange = (value: boolean) => updateArgs({ checked: value });

  return (
    <>
      <Checkbox
        {...args}
        onChange={handleChange}
        checked={checked}
        variant="default"
        position="right"
      />
      <Checkbox
        {...args}
        onChange={handleChange}
        checked={checked}
        variant="plus"
        position="right"
      />
    </>
  );
};
