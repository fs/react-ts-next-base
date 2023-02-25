import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Wrapper } from './styled';
import LayoutTemplate from '../index';

export default {
  title: 'Templates/LayoutTemplate',
  component: LayoutTemplate,
  argTypes: {
    variant: {
      control: false,
    },
  },
  args: {
    variant: 'light',
    isShowMainMenu: true,
  },
} as ComponentMeta<typeof LayoutTemplate>;

export const Light: ComponentStory<typeof LayoutTemplate> = args => (
  <LayoutTemplate {...args}>
    <Wrapper>Content</Wrapper>
  </LayoutTemplate>
);

export const Transparent: ComponentStory<typeof LayoutTemplate> = args => (
  <LayoutTemplate {...args} variant="transparent">
    <Wrapper>Content</Wrapper>
  </LayoutTemplate>
);
