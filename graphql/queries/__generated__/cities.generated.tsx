import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CityFragmentDoc } from '../../fragments/__generated__/cityInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CitiesQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['String']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  strict?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;

export type CitiesQuery = {
  __typename?: 'Query';
  cities: {
    __typename?: 'CityConnection';
    edges?: Array<{
      __typename?: 'CityEdge';
      cursor: string;
      node?: {
        __typename?: 'City';
        cityType: string;
        fiasId: string;
        id: string;
        kladrId: string;
        name: string;
        region: string;
      } | null;
    } | null> | null;
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  };
};

export const CitiesDocument = gql`
  query Cities($after: String, $name: String, $strict: Boolean) {
    cities(after: $after, name: $name, strict: $strict) {
      edges {
        cursor
        node {
          ...City
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${CityFragmentDoc}
`;

/**
 * __useCitiesQuery__
 *
 * To run a query within a React component, call `useCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCitiesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      name: // value for 'name'
 *      strict: // value for 'strict'
 *   },
 * });
 */
export function useCitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<CitiesQuery, CitiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
}
export function useCitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CitiesQuery, CitiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
}
export type CitiesQueryHookResult = ReturnType<typeof useCitiesQuery>;
export type CitiesLazyQueryHookResult = ReturnType<typeof useCitiesLazyQuery>;
export type CitiesQueryResult = Apollo.QueryResult<CitiesQuery, CitiesQueryVariables>;
