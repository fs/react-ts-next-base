import * as Types from '../../types';

import { gql } from '@apollo/client';
export type CityFragment = {
  __typename?: 'City';
  cityType: string;
  fiasId: string;
  id: string;
  kladrId: string;
  name: string;
  region: string;
};

export const CityFragmentDoc = gql`
  fragment City on City {
    cityType
    fiasId
    id
    kladrId
    name
    region
  }
`;
