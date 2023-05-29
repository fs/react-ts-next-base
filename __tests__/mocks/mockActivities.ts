import { ActivityEvent } from 'graphql/types';

import { mockPageInfo } from './mockPageInfo';

export const mockActivities = [
  {
    __typename: 'Activity' as const,
    body: 'text',
    createdAt: '20-10-2022',
    event: ActivityEvent.UserLoggedIn,
    id: '1',
    title: 'title',
    user: {
      __typename: 'User' as const,
      avatarUrl: null,
      email: 'test@test.com',
      firstName: 'firstName',
      id: '1',
      lastName: 'lastName',
    },
  },
];

export const mockUseActivitiesData = {
  activities: mockActivities,
  pageInfo: mockPageInfo,
  loading: false,
  error: undefined,
};
