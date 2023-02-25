import * as Types from '../../types';

import { gql } from '@apollo/client';
export type CompanyLegalFormFragment = {
  __typename?: 'CompanyLegalForm';
  id: string;
  name: string;
  shortName: string;
};

export const CompanyLegalFormFragmentDoc = gql`
  fragment CompanyLegalForm on CompanyLegalForm {
    id
    name
    shortName
  }
`;
