import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CountriesQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['String']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type CountriesQuery = {
  __typename?: 'Query';
  countries: {
    __typename?: 'CountryConnection';
    edges?: Array<{
      __typename?: 'CountryEdge';
      cursor: string;
      node?: { __typename?: 'Country'; id: string; name: string } | null;
    } | null> | null;
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  };
};

export const CountriesDocument = gql`
  query Countries($after: String, $name: String) {
    countries(after: $after, name: $name) {
      edges {
        cursor
        node {
          id
          name
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCountriesQuery(
  baseOptions?: Apollo.QueryHookOptions<CountriesQuery, CountriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
}
export function useCountriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CountriesQuery, CountriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
}
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<typeof useCountriesLazyQuery>;
export type CountriesQueryResult = Apollo.QueryResult<CountriesQuery, CountriesQueryVariables>;
