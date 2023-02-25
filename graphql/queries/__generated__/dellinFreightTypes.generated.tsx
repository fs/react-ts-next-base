import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DellinFreightTypesQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
  active?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;

export type DellinFreightTypesQuery = {
  __typename?: 'Query';
  dellinFreightTypes: {
    __typename?: 'DellinFreightKindConnection';
    edges?: Array<{
      __typename?: 'DellinFreightKindEdge';
      cursor: string;
      node?: { __typename?: 'DellinFreightKind'; active: boolean; id: string; name: string } | null;
    } | null> | null;
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  };
};

export const DellinFreightTypesDocument = gql`
  query DellinFreightTypes($name: String, $active: Boolean) {
    dellinFreightTypes(name: $name, active: $active) {
      edges {
        cursor
        node {
          active
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
 * __useDellinFreightTypesQuery__
 *
 * To run a query within a React component, call `useDellinFreightTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDellinFreightTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDellinFreightTypesQuery({
 *   variables: {
 *      name: // value for 'name'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useDellinFreightTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<DellinFreightTypesQuery, DellinFreightTypesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DellinFreightTypesQuery, DellinFreightTypesQueryVariables>(
    DellinFreightTypesDocument,
    options,
  );
}
export function useDellinFreightTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DellinFreightTypesQuery,
    DellinFreightTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DellinFreightTypesQuery, DellinFreightTypesQueryVariables>(
    DellinFreightTypesDocument,
    options,
  );
}
export type DellinFreightTypesQueryHookResult = ReturnType<typeof useDellinFreightTypesQuery>;
export type DellinFreightTypesLazyQueryHookResult = ReturnType<
  typeof useDellinFreightTypesLazyQuery
>;
export type DellinFreightTypesQueryResult = Apollo.QueryResult<
  DellinFreightTypesQuery,
  DellinFreightTypesQueryVariables
>;
