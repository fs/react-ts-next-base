import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Button from 'components/shared/atoms/Button';

import FileInput from '../index';
import { EFormat } from '../types';

export default {
  title: 'molecules/FileInput',
  component: FileInput,
  argTypes: {
    format: {
      control: 'check',
      options: Object.values(EFormat),
    },
  },
  args: {
    format: ['photo'],
    multiple: true,
    name: '',
    testId: '',
    action: () => {},
    setLoading: () => {},
    limitUpload: 10,
  },
  decorators: [Story => <Button label="load file">{Story()}</Button>],
} as ComponentMeta<typeof FileInput>;

export const Demo: ComponentStory<typeof FileInput> = args => <FileInput {...args} />;
