import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Notification from '../index';

export default {
  title: 'atoms/Notification',
  component: Notification,
  args: {
    isShow: true,
    text: 'text notification',
  },
} as ComponentMeta<typeof Notification>;

export const Demo: ComponentStory<typeof Notification> = args => <Notification {...args} />;
Demo.args = {
  isShow: true,
  text: <>Notification text</>,
};
