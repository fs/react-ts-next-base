import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SidebarContent, Wrapper } from './styled';
import DashboardTemplate from '../index';

export default {
  title: 'Templates/DashboardTemplate',
  component: DashboardTemplate,
  argTypes: {},
  args: {
    showBreadcrumbs: true,
    sidebarContent: <SidebarContent>SidebarContent Example</SidebarContent>,
  },
} as ComponentMeta<typeof DashboardTemplate>;

export const Demo: ComponentStory<typeof DashboardTemplate> = args => (
  <DashboardTemplate {...args}>
    <Wrapper>Content</Wrapper>
  </DashboardTemplate>
);
