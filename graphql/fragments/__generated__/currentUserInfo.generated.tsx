import * as Types from '../../types';

import { gql } from '@apollo/client';
export type CurrentUserFragment = {
  __typename?: 'CurrentUser';
  id: string;
  avatarUrl?: string | null;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
};

export const CurrentUserFragmentDoc = gql`
  fragment CurrentUser on CurrentUser {
    id
    avatarUrl
    email
    firstName
    lastName
  }
`;
