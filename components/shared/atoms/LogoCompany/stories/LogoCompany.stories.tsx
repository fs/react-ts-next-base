import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import mockCompany from '__tests__/mocks/mockCompany';
import LogoCompany from '../index';

export default {
  title: 'atoms/LogoCompany',
  component: LogoCompany,
  argTypes: {
    width: {
      description: 'Width of logo',
      table: {
        type: { summary: 'String' },
      },
    },
    edit: {
      description: 'Contain edit button or not',
    },
  },
  args: {
    edit: false,
    $width: '5rem',
    company: mockCompany,
  },
} as ComponentMeta<typeof LogoCompany>;

export const Demo: ComponentStory<typeof LogoCompany> = args => <LogoCompany {...args} />;
