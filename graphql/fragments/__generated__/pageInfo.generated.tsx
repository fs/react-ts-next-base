import * as Types from '../../types';

import { gql } from '@apollo/client';
export type PageInfoFragment = {
  __typename?: 'PageInfo';
  endCursor?: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string | null;
};

export const PageInfoFragmentDoc = gql`
  fragment PageInfo on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`;
