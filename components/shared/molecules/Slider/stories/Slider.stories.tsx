import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ColorKeys } from 'public/styles/config/colors';

import Slider from '../index';
import { Slide, Container } from './styled';

const colorsMap: ColorKeys[] = ['error', 'orangeF7', 'orange', 'green', 'blue'];
const slides = colorsMap.map((color, index) => (
  <Slide key={index} color={color}>
    {index}
  </Slide>
));

export default {
  title: 'molecules/Slider',
  component: Slider,
  argTypes: {
    children: {
      control: {
        type: null,
      },
    },
  },
  args: {
    selectedItem: 0,
    width: '12rem',
    children: slides,
  },
  decorators: [Story => <Container>{Story()}</Container>],
} as ComponentMeta<typeof Slider>;

export const Demo: ComponentStory<typeof Slider> = args => <Slider {...args} />;
