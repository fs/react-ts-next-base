import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyLocationFragmentDoc } from '../../fragments/__generated__/companyLocationInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompanyLocationsQueryVariables = Types.Exact<{
  companyId: Types.Scalars['ID'];
  statuses?: Types.InputMaybe<
    Array<Types.CompanyLocationStatusEnum> | Types.CompanyLocationStatusEnum
  >;
}>;

export type CompanyLocationsQuery = {
  __typename?: 'Query';
  companyLocations: Array<{
    __typename?: 'CompanyLocation';
    status: Types.CompanyLocationStatusEnum;
    address?: string | null;
    comment?: string | null;
    id: string;
    canBeDestroyed: boolean;
    canBeUpdated: boolean;
    main: boolean;
    phoneNumber?: string | null;
    postcode?: string | null;
    rejectionReason?: string | null;
    verificationDeadlineAt?: any | null;
    city: {
      __typename?: 'City';
      cityType: string;
      fiasId: string;
      id: string;
      kladrId: string;
      name: string;
      region: string;
    };
    companyLicenses: Array<{
      __typename?: 'CompanyLocationLicense';
      id: string;
      number: string;
      companyLicensePhotos?: Array<{
        __typename?: 'CompanyLicensePhoto';
        id: string;
        imageUrl: string;
      }> | null;
    }>;
    company: {
      __typename?: 'Company';
      id: string;
      officialName: string;
      unofficialName: string;
      legalForm: { __typename?: 'CompanyLegalForm'; id: string; name: string; shortName: string };
    };
  }>;
};

export const CompanyLocationsDocument = gql`
  query CompanyLocations($companyId: ID!, $statuses: [CompanyLocationStatusEnum!]) {
    companyLocations(companyId: $companyId, statuses: $statuses) {
      ...CompanyLocation
    }
  }
  ${CompanyLocationFragmentDoc}
`;

/**
 * __useCompanyLocationsQuery__
 *
 * To run a query within a React component, call `useCompanyLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyLocationsQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      statuses: // value for 'statuses'
 *   },
 * });
 */
export function useCompanyLocationsQuery(
  baseOptions: Apollo.QueryHookOptions<CompanyLocationsQuery, CompanyLocationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CompanyLocationsQuery, CompanyLocationsQueryVariables>(
    CompanyLocationsDocument,
    options,
  );
}
export function useCompanyLocationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CompanyLocationsQuery, CompanyLocationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CompanyLocationsQuery, CompanyLocationsQueryVariables>(
    CompanyLocationsDocument,
    options,
  );
}
export type CompanyLocationsQueryHookResult = ReturnType<typeof useCompanyLocationsQuery>;
export type CompanyLocationsLazyQueryHookResult = ReturnType<typeof useCompanyLocationsLazyQuery>;
export type CompanyLocationsQueryResult = Apollo.QueryResult<
  CompanyLocationsQuery,
  CompanyLocationsQueryVariables
>;
