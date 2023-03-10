import * as Types from '../../types';

import { gql } from '@apollo/client';
export type ActivityFragment = {
  __typename?: 'Activity';
  body: string;
  createdAt: any;
  event: Types.ActivityEvent;
  id: string;
  title: string;
  user: {
    __typename?: 'User';
    avatarUrl?: string | null;
    email: string;
    firstName?: string | null;
    id: string;
    lastName?: string | null;
  };
};

export const ActivityFragmentDoc = gql`
  fragment Activity on Activity {
    body
    createdAt
    event
    id
    title
    user {
      avatarUrl
      email
      firstName
      id
      lastName
    }
  }
`;
