import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Rate from '../index';

export default {
  title: 'atoms/Rate',
  component: Rate,
  argTypes: {
    rating: {
      description: 'Item rating',
      table: {
        type: { summary: 'Number' },
      },
    },
  },
  args: {
    rating: 5,
  },
} as ComponentMeta<typeof Rate>;

const Template: ComponentStory<typeof Rate> = args => <Rate {...args} />;

export const Demo = Template.bind({});

export const EmptyRating = Template.bind({});
EmptyRating.args = {
  rating: undefined,
};
