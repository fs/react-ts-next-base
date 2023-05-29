import { useArgs } from '@storybook/client-api';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Checkbox from '../index';
import { EPosition } from '../types';

export default {
  title: 'atoms/Checkbox',
  component: Checkbox,
  argTypes: {
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

export const Right: ComponentStory<typeof Checkbox> = args => {
  const [{ checked }, updateArgs] = useArgs();
  const handleChange = (value: boolean) => updateArgs({ checked: value });

  return <Checkbox {...args} onChange={handleChange} checked={checked} position="right" />;
};
