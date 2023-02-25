import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Footer from '../index';

export default {
  title: 'organisms/Footer',
  component: Footer,
  argTypes: {},
  args: {
    isShowLinks: true,
  },
} as ComponentMeta<typeof Footer>;

export const Demo: ComponentStory<typeof Footer> = args => {
  return <Footer {...args} />;
};
