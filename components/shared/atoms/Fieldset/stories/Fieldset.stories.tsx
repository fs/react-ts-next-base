import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import Fieldset from '../index';
import { Container } from './styled';

export default {
  title: 'atoms/Fieldset',
  component: Fieldset,
  argTypes: {
    children: {
      description: 'React component',
      control: {
        type: null,
      },
    },
    width: {
      description: 'css width property',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    legend: 'fieldset legend',
    $width: 'auto',
  },
  decorators: [Story => <Container>{Story()}</Container>],
} as ComponentMeta<typeof Fieldset>;
const longText =
  'Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, ';

const Template: ComponentStory<typeof Fieldset> = args => <Fieldset {...args} />;

export const Demo: ComponentStory<typeof Fieldset> = Template.bind({});
Demo.args = {
  children: <>Ешки кошки</>,
};

export const Overflow: ComponentStory<typeof Fieldset> = Template.bind({});
Overflow.args = {
  children: <>{longText}</>,
};
