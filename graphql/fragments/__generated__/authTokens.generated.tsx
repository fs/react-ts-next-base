import * as Types from '../../types';

import { gql } from '@apollo/client';
export type AuthTokensFragment = {
  __typename?: 'Authentication';
  accessToken: string;
  refreshToken: string;
};

export const AuthTokensFragmentDoc = gql`
  fragment AuthTokens on Authentication {
    accessToken
    refreshToken
  }
`;
