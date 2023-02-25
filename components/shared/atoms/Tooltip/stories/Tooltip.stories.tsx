import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Icon from 'components/shared/atoms/Icon';
import Tooltip from '../index';

import { Container } from './styled';

export default {
  title: 'atoms/Tooltip',
  component: Tooltip,
  argTypes: {
    children: {
      control: { type: null },
    },
    visible: {
      control: { type: null },
    },
  },
  args: {
    placement: 'bottom',
    width: '15rem',
    text: 'example text tooltip',
    active: true,
    children: <Icon name="question" $size={24} />,
    offset: [0, 10],
    closeOnTriggerHidden: false,
    closeOnOutsideClick: true,
    trigger: 'hover',
    delayHide: 0,
    delayShow: 0,
    followCursor: false,
    defaultVisible: false,
    interactive: false,
  },
  decorators: [Story => <Container>{Story()}</Container>],
} as ComponentMeta<typeof Tooltip>;

export const Demo: ComponentStory<typeof Tooltip> = args => <Tooltip {...args} />;

export const Overflow: ComponentStory<typeof Tooltip> = args => <Tooltip {...args} />;
Overflow.args = {
  text: 'example text tooltip example text tooltip example text tooltip example text tooltip example text tooltip example text tooltip example text tooltip',
};
