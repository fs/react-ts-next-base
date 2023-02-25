import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DadataOrganizationQueryVariables = Types.Exact<{
  inn: Types.Scalars['String'];
}>;

export type DadataOrganizationQuery = {
  __typename?: 'Query';
  dadataOrganization?: {
    __typename?: 'DadataOrganization';
    address?: string | null;
    directorFullName?: string | null;
    email?: string | null;
    inn?: string | null;
    kpp?: string | null;
    name?: string | null;
    ogrn?: string | null;
    oktmo?: string | null;
    phone?: string | null;
    postcode?: string | null;
    shortName?: string | null;
    legalFormName?: string | null;
    legalFormShortName?: string | null;
  } | null;
};

export const DadataOrganizationDocument = gql`
  query DadataOrganization($inn: String!) {
    dadataOrganization(inn: $inn) {
      address
      directorFullName
      email
      inn
      kpp
      name
      ogrn
      oktmo
      phone
      postcode
      shortName
      legalFormName
      legalFormShortName
    }
  }
`;

/**
 * __useDadataOrganizationQuery__
 *
 * To run a query within a React component, call `useDadataOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useDadataOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDadataOrganizationQuery({
 *   variables: {
 *      inn: // value for 'inn'
 *   },
 * });
 */
export function useDadataOrganizationQuery(
  baseOptions: Apollo.QueryHookOptions<DadataOrganizationQuery, DadataOrganizationQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DadataOrganizationQuery, DadataOrganizationQueryVariables>(
    DadataOrganizationDocument,
    options,
  );
}
export function useDadataOrganizationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DadataOrganizationQuery,
    DadataOrganizationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DadataOrganizationQuery, DadataOrganizationQueryVariables>(
    DadataOrganizationDocument,
    options,
  );
}
export type DadataOrganizationQueryHookResult = ReturnType<typeof useDadataOrganizationQuery>;
export type DadataOrganizationLazyQueryHookResult = ReturnType<
  typeof useDadataOrganizationLazyQuery
>;
export type DadataOrganizationQueryResult = Apollo.QueryResult<
  DadataOrganizationQuery,
  DadataOrganizationQueryVariables
>;
