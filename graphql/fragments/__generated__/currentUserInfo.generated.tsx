import * as Types from '../../types';

import { gql } from '@apollo/client';
export type CurrentUserFragment = {
  __typename?: 'CurrentUser';
  avatarUrl?: string | null;
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
};

export const CurrentUserFragmentDoc = gql`
  fragment CurrentUser on CurrentUser {
    avatarUrl
    id
    email
    firstName
    lastName
  }
`;
