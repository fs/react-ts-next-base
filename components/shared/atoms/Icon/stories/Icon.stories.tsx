import { ComponentMeta, ComponentStory } from '@storybook/react';

import { configColors } from 'public/styles/config/colors';

import { configIcons, IconKeys } from '../config';
import Icon from '../index';

import { Container, IconDescription, IconItem } from './styled';

export default {
  title: 'atoms/Icon',
  component: Icon,
  argTypes: {
    name: { control: { type: 'select' }, options: Object.keys(configIcons) },
    $color: { control: { type: 'select' }, options: Object.keys(configColors) },
    $size: { description: 'width and height of icon (px)', control: { type: 'number' } },
    $mt: { description: 'margin-top (px)' },
    $mr: { description: 'margin-right (px)' },
    $mb: { description: 'margin-bottom (px)' },
    $ml: { description: 'margin-left (px)' },
  },
  args: {
    $color: 'black',
    name: 'close',
    $size: 24,
    $mt: 0,
    $mr: 0,
    $mb: 0,
    $ml: 0,
  },
  decorators: [Story => <Container>{Story()}</Container>],
} as ComponentMeta<typeof Icon>;

export const Demo: ComponentStory<typeof Icon> = args => <Icon {...args} />;
Demo.args = {
  name: 'close',
};

export const All: ComponentStory<typeof Icon> = args => (
  <>
    {Object.keys(configIcons)
      .sort()
      .map(key => (
        <IconItem key={key}>
          <Icon {...args} name={key as IconKeys} />
          <IconDescription>{key}</IconDescription>
        </IconItem>
      ))}
  </>
);
