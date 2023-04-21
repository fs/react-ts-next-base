import { ComponentMeta, ComponentStory } from '@storybook/react';

import mockCurrentUser from '__tests__/mocks/mockCurrentUser';

import ProfileForm from '../index';

export default {
  title: 'organisms/ProfileForm',
  component: ProfileForm,
  args: {
    user: mockCurrentUser,
  },
} as ComponentMeta<typeof ProfileForm>;

export const Demo: ComponentStory<typeof ProfileForm> = args => <ProfileForm {...args} />;
