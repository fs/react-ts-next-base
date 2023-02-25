import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Collapsible from '../index';

export default {
  title: 'atoms/Collapsible',
  component: Collapsible,
  argTypes: {},
  args: {
    variant: 'primary',
    accordion: [
      {
        heading: 'title',
        content: 'content',
        noContent: 'no centent',
        open: false,
      },
    ],
    disabled: false,
  },
} as ComponentMeta<typeof Collapsible>;

export const Demo: ComponentStory<typeof Collapsible> = args => <Collapsible {...args} />;

export const Variant: ComponentStory<typeof Collapsible> = args => {
  return (
    <>
      <Collapsible {...args} variant="primary" />
      <Collapsible {...args} variant="secondary" />
    </>
  );
};

export const Disabled: ComponentStory<typeof Collapsible> = args => (
  <>
    <Collapsible {...args} variant="primary" disabled />
    <Collapsible {...args} variant="secondary" disabled />
  </>
);
