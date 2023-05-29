import * as Types from '../../types';

import { gql } from '@apollo/client';
export type ActivityFragment = {
  __typename?: 'Activity';
  id: string;
  body: string;
  title: string;
  createdAt: string;
  event: Types.ActivityEvent;
  user: {
    __typename?: 'User';
    avatarUrl?: string | null;
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  };
};

export const ActivityFragmentDoc = gql`
  fragment Activity on Activity {
    id
    body
    title
    user {
      avatarUrl
      id
      email
      firstName
      lastName
    }
    createdAt
    event
  }
`;
