import * as Types from '../../types';

import { gql } from '@apollo/client';
export type CurrentUserInfoFragment = {
  __typename?: 'CurrentUser';
  avatarUrl?: string | null;
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
};

export const CurrentUserInfoFragmentDoc = gql`
  fragment CurrentUserInfo on CurrentUser {
    avatarUrl
    id
    email
    firstName
    lastName
  }
`;
