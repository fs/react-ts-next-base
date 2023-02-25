import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import mockCompany from '__tests__/mocks/mockCompany';

import CompanyTemplate from '../index';
import { Wrapper } from './styled';

export default {
  title: 'Templates/CompanyTemplate',
  component: CompanyTemplate,
  argTypes: {},
  args: {
    company: mockCompany,
  },
} as ComponentMeta<typeof CompanyTemplate>;

export const Demo: ComponentStory<typeof CompanyTemplate> = args => (
  <CompanyTemplate {...args}>
    <Wrapper>Content</Wrapper>
  </CompanyTemplate>
);
