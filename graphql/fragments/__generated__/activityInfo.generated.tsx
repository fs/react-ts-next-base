import * as Types from '../../types';

import { gql } from '@apollo/client';
export type ActivityFragment = { __typename?: 'Activity'; body: string; id: string; title: string };

export const ActivityFragmentDoc = gql`
  fragment Activity on Activity {
    body
    id
    title
  }
`;
