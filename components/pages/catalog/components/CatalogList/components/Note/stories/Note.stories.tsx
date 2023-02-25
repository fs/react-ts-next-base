import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import Note from '../index';
import { Container } from './styled';

export default {
  title: 'atoms/Note',
  component: Note,
  decorators: [Story => <Container>{Story()}</Container>],
} as ComponentMeta<typeof Note>;

const Template: ComponentStory<typeof Note> = () => <Note />;

export const Demo = Template.bind({});
