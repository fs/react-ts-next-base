import { ComponentMeta, ComponentStory } from '@storybook/react';

import DefaultTemplate from '../index';

export default {
  title: 'Templates/DefaultTemplate',
  component: DefaultTemplate,
  args: {
    testId: 'default-template',
  },
} as ComponentMeta<typeof DefaultTemplate>;

export const Demo: ComponentStory<typeof DefaultTemplate> = args => (
  <DefaultTemplate {...args}>Content</DefaultTemplate>
);
