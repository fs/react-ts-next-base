import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PropertiesQueryVariables = Types.Exact<{
  categoryIds?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  ids?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type PropertiesQuery = {
  __typename?: 'Query';
  properties?: {
    __typename?: 'PropertyInterfaceConnection';
    edges?: Array<{
      __typename?: 'PropertyInterfaceEdge';
      cursor: string;
      node?:
        | {
            __typename?: 'DictionaryProperty';
            id: string;
            name: string;
            displayName: string;
            categoryPath: Array<{ __typename?: 'Category'; id: string; name: string }>;
            canDestroy: { __typename?: 'AuthorizationResult'; value: boolean };
          }
        | {
            __typename?: 'IntegerProperty';
            unit?: string | null;
            id: string;
            name: string;
            displayName: string;
            categoryPath: Array<{ __typename?: 'Category'; id: string; name: string }>;
            canDestroy: { __typename?: 'AuthorizationResult'; value: boolean };
          }
        | {
            __typename?: 'StringProperty';
            id: string;
            name: string;
            displayName: string;
            categoryPath: Array<{ __typename?: 'Category'; id: string; name: string }>;
            canDestroy: { __typename?: 'AuthorizationResult'; value: boolean };
          }
        | null;
    } | null> | null;
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  } | null;
};

export const PropertiesDocument = gql`
  query Properties($categoryIds: [ID!], $ids: [ID!], $name: String, $after: String, $first: Int) {
    properties(categoryIds: $categoryIds, name: $name, after: $after, first: $first, ids: $ids) {
      edges {
        cursor
        node {
          id
          name
          displayName
          categoryPath {
            id
            name
          }
          canDestroy {
            value
          }
          ... on IntegerProperty {
            unit
          }
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
 * __usePropertiesQuery__
 *
 * To run a query within a React component, call `usePropertiesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropertiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePropertiesQuery({
 *   variables: {
 *      categoryIds: // value for 'categoryIds'
 *      ids: // value for 'ids'
 *      name: // value for 'name'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function usePropertiesQuery(
  baseOptions?: Apollo.QueryHookOptions<PropertiesQuery, PropertiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PropertiesQuery, PropertiesQueryVariables>(PropertiesDocument, options);
}
export function usePropertiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PropertiesQuery, PropertiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PropertiesQuery, PropertiesQueryVariables>(
    PropertiesDocument,
    options,
  );
}
export type PropertiesQueryHookResult = ReturnType<typeof usePropertiesQuery>;
export type PropertiesLazyQueryHookResult = ReturnType<typeof usePropertiesLazyQuery>;
export type PropertiesQueryResult = Apollo.QueryResult<PropertiesQuery, PropertiesQueryVariables>;
