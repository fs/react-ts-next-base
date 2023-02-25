import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import Rating from '../index';

export default {
  title: 'atoms/Rating',
  component: Rating,
  argTypes: {
    rating: {
      description: 'Item rating',
      table: {
        type: { summary: 'Number' },
        defaultValue: { summary: 0 },
      },
    },
    hideRatingCount: {
      description: 'Hide rating count',
      table: {
        type: { summary: 'Boolean' },
        defaultValue: { summary: false },
      },
    },
    setRating: {
      description: 'Use to change current rating value',
      table: {
        type: { summary: '() => {}' },
      },
    },
  },
  args: {
    rating: 4.5,
    hideRatingCount: false,
  },
} as ComponentMeta<typeof Rating>;

const Template: ComponentStory<typeof Rating> = args => <Rating {...args} />;

export const Demo = Template.bind({});

const ClickableTemplate: ComponentStory<typeof Rating> = args => {
  const [value, setValue] = useState(0);
  const handleOnChange = (rating: number) => {
    setValue(rating);
  };

  return <Rating {...args} setRating={handleOnChange} rating={value} />;
};

export const Clickable = ClickableTemplate.bind({});
Clickable.storyName = 'Clickable rating';
Clickable.parameters = { controls: { exclude: ['rating'] } };
