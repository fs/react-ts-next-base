import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { WeekdayEnum } from 'graphql/types';

import TooltipDiscount from '../index';

import { Container } from './styled';

export default {
  title: 'atoms/TooltipDiscount',
  component: TooltipDiscount,
  args: {
    discount: 16,
    weeklyDiscount: {
      amount: 7,
      id: '1',
      weekday: WeekdayEnum.Monday,
    },
    periodDiscount: {
      amount: 9,
      endDate: '2029-12-20',
      id: '1',
      startDate: '2021-12-18',
    },
  },
  decorators: [Story => <Container>{Story()}</Container>],
} as ComponentMeta<typeof TooltipDiscount>;

export const Demo: ComponentStory<typeof TooltipDiscount> = args => <TooltipDiscount {...args} />;
