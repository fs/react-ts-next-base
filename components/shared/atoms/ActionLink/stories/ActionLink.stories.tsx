import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ActionLink from '../index';

export default {
  title: 'atoms/ActionLink',
  component: ActionLink,
  argTypes: {
    children: {
      control: { type: null },
      $color: {
        defaultValue: { summary: 'blue' },
      },
    },
  },
  args: {
    label: 'action link',
    size: 12,
    $color: 'blue',
    onClick: () => {},
  },
} as ComponentMeta<typeof ActionLink>;

export const Demo: ComponentStory<typeof ActionLink> = args => <ActionLink {...args} />;
