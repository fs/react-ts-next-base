import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyLocationFragmentDoc } from '../../fragments/__generated__/companyLocationInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CustomerCompanyLocationsQueryVariables = Types.Exact<{
  statuses?: Types.InputMaybe<
    Array<Types.CompanyLocationStatusEnum> | Types.CompanyLocationStatusEnum
  >;
  companyName?: Types.InputMaybe<Types.Scalars['SquishedString']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  ids?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
}>;

export type CustomerCompanyLocationsQuery = {
  __typename?: 'Query';
  customerCompanyLocations: {
    __typename?: 'CompanyLocationConnection';
    edges?: Array<{
      __typename?: 'CompanyLocationEdge';
      node?: {
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
          legalForm: {
            __typename?: 'CompanyLegalForm';
            id: string;
            name: string;
            shortName: string;
          };
        };
      } | null;
    } | null> | null;
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  };
};

export const CustomerCompanyLocationsDocument = gql`
  query CustomerCompanyLocations(
    $statuses: [CompanyLocationStatusEnum!]
    $companyName: SquishedString
    $after: String
    $first: Int
    $ids: [ID!]
  ) {
    customerCompanyLocations(
      statuses: $statuses
      companyName: $companyName
      after: $after
      first: $first
      ids: $ids
    ) {
      edges {
        node {
          ...CompanyLocation
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${CompanyLocationFragmentDoc}
`;

/**
 * __useCustomerCompanyLocationsQuery__
 *
 * To run a query within a React component, call `useCustomerCompanyLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerCompanyLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerCompanyLocationsQuery({
 *   variables: {
 *      statuses: // value for 'statuses'
 *      companyName: // value for 'companyName'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useCustomerCompanyLocationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CustomerCompanyLocationsQuery,
    CustomerCompanyLocationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CustomerCompanyLocationsQuery, CustomerCompanyLocationsQueryVariables>(
    CustomerCompanyLocationsDocument,
    options,
  );
}
export function useCustomerCompanyLocationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CustomerCompanyLocationsQuery,
    CustomerCompanyLocationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CustomerCompanyLocationsQuery, CustomerCompanyLocationsQueryVariables>(
    CustomerCompanyLocationsDocument,
    options,
  );
}
export type CustomerCompanyLocationsQueryHookResult = ReturnType<
  typeof useCustomerCompanyLocationsQuery
>;
export type CustomerCompanyLocationsLazyQueryHookResult = ReturnType<
  typeof useCustomerCompanyLocationsLazyQuery
>;
export type CustomerCompanyLocationsQueryResult = Apollo.QueryResult<
  CustomerCompanyLocationsQuery,
  CustomerCompanyLocationsQueryVariables
>;
