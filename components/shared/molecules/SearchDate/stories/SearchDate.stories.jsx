import React from 'react';

import SearchDate from '../index';
import { Container } from './styled';

export default {
  title: 'molecules/SearchDate',
  component: SearchDate,
  argTypes: {
    onSubmit: {
      description: 'Function for onSubmit form',
      table: {
        type: { summary: '() => {}' },
      },
    },
    query: {
      description: 'Use for pass search query',
      table: {
        type: { summary: 'object' },
      },
    },
  },
  args: {
    query: {
      startDate: '2022-04-07',
      endDate: '2022-06-07',
    },
    onSubmit: () => {},
  },
};

const Template = args => (
  <Container>
    <SearchDate {...args} />
  </Container>
);

export const Demo = Template.bind({});
