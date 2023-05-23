import * as Types from '../../types';

import { gql } from '@apollo/client';
export type PublicActivityFragment = {
  __typename?: 'PublicActivity';
  body: string;
  id: string;
  title: string;
};

export const PublicActivityFragmentDoc = gql`
  fragment PublicActivity on PublicActivity {
    body
    id
    title
  }
`;
