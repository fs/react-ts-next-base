import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { mockCategories } from '__tests__/mocks/mockCategories';
import Categories from '../index';

const category = {
  ...mockCategories[0],
  parent: { ...mockCategories[1], parent: mockCategories[2] },
};

export default {
  title: 'atoms/Categories',
  component: Categories,
  argTypes: {
    category: {
      description: 'Product category',
    },
  },
  args: {
    category,
  },
} as ComponentMeta<typeof Categories>;

const Template: ComponentStory<typeof Categories> = args => <Categories {...args} />;

export const Demo = Template.bind({});
