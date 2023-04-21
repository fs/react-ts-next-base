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
    $size: 16,
    $color: 'blue_500',
    onClick: () => {},
  },
} as ComponentMeta<typeof ActionLink>;

export const Demo: ComponentStory<typeof ActionLink> = args => <ActionLink {...args} />;
