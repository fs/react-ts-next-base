import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Wrapper } from './styled';
import AuthTemplate from '../AuthTemplate';

export default {
  title: 'Templates/AuthTemplate',
  component: AuthTemplate,
  argTypes: {},
  args: {
    hasFooter: true,
  },
} as ComponentMeta<typeof AuthTemplate>;

export const Demo: ComponentStory<typeof AuthTemplate> = args => (
  <AuthTemplate {...args} testId="reset-password-template">
    <Wrapper>content</Wrapper>
  </AuthTemplate>
);
