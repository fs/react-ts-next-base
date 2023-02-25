import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import RejectComment from '../index';
import { TRejectComment } from '../types';

export default {
  title: 'atoms/RejectComment',
  component: RejectComment,
  argTypes: {
    comment: {
      description: 'comment',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    comment: 'rejection comment',
  },
} as ComponentMeta<typeof RejectComment>;
const longText =
  'Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, Long text, ';

export const Demo: ComponentStory<typeof RejectComment> = (args: TRejectComment) => (
  <RejectComment {...args} />
);

export const Overflow: ComponentStory<typeof RejectComment> = (args: TRejectComment) => (
  <RejectComment {...args} />
);
Overflow.args = {
  comment: longText,
};
