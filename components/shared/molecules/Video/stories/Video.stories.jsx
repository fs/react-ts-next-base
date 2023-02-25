import React from 'react';

import Video from '../index';
import { Wrapper } from './styled';

export default {
  title: 'molecules/Video',
  component: Video,
  argTypes: {
    url: {
      description: 'Video url',
      table: {
        type: { summary: 'String' },
      },
    },
    testId: {
      description: 'Id for tests',
      table: {
        type: { summary: 'String' },
      },
    },
  },
  args: {
    url: 'https://medagregatorstg.hb.bizmrg.com/store/company/22/a4d17be9220dcaeec06aefbd4ba120f2.mp4',
    testId: 'video-123',
  },
  decorators: [Story => <Wrapper>{Story()}</Wrapper>],
};

const Template = args => <Video {...args} />;

export const Demo = Template.bind({});
