import * as Types from '../../types';

import { gql } from '@apollo/client';
export type CategoryInfoFragment = {
  __typename?: 'Category';
  depth: number;
  id: string;
  name: string;
  position: number;
  canDestroy: { __typename?: 'AuthorizationResult'; value: boolean; message?: string | null };
};

export const CategoryInfoFragmentDoc = gql`
  fragment CategoryInfo on Category {
    depth
    id
    name
    position
    canDestroy {
      value
      message
    }
  }
`;
