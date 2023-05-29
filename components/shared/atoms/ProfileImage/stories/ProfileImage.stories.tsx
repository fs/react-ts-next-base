import { ComponentMeta, ComponentStory } from '@storybook/react';

import ProfileImage from '../index';

import { ImageWrapper } from './styled';

export default {
  title: 'atoms/ProfileImage',
  component: ProfileImage,
  args: {
    id: '15',
  },
} as ComponentMeta<typeof ProfileImage>;

const Template: ComponentStory<typeof ProfileImage> = args => (
  <ImageWrapper>
    <ProfileImage {...args} />
  </ImageWrapper>
);

export const Demo = Template.bind({});
