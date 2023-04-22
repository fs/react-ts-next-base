import { ComponentMeta, ComponentStory } from '@storybook/react';

import mockCurrentUser from '__tests__/mocks/mockCurrentUser';

import Header from '../index';

export default {
  title: 'organisms/Header',
  component: Header,
  args: {
    user: null,
    signOut: async () => {},
  },
} as ComponentMeta<typeof Header>;

export const Demo: ComponentStory<typeof Header> = args => <Header {...args} />;

export const WithUser: ComponentStory<typeof Header> = args => (
  <Header {...args} user={mockCurrentUser} />
);
