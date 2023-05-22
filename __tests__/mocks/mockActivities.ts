import { mockPageInfo } from './mockPageInfo';

export const mockActivities = [
  {
    __typename: 'PublicActivity' as const,
    body: 'text',
    id: '1',
    title: 'title',
  },
];

export const mockUseActivitiesData = {
  activities: mockActivities,
  pageInfo: mockPageInfo,
  loading: false,
  error: undefined,
};
