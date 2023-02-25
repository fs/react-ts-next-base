import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CategoryInfoFragmentDoc } from '../../fragments/__generated__/categoryInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeepCategoriesQueryVariables = Types.Exact<{
  parentId?: Types.InputMaybe<Types.Scalars['ID']>;
  ids?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
}>;

export type DeepCategoriesQuery = {
  __typename?: 'Query';
  categories: Array<{
    __typename?: 'Category';
    depth: number;
    id: string;
    name: string;
    position: number;
    parent?: {
      __typename?: 'Category';
      depth: number;
      id: string;
      name: string;
      position: number;
      parent?: {
        __typename?: 'Category';
        depth: number;
        id: string;
        name: string;
        position: number;
        parent?: {
          __typename?: 'Category';
          depth: number;
          id: string;
          name: string;
          position: number;
          canDestroy: {
            __typename?: 'AuthorizationResult';
            value: boolean;
            message?: string | null;
          };
        } | null;
        canDestroy: { __typename?: 'AuthorizationResult'; value: boolean; message?: string | null };
      } | null;
      canDestroy: { __typename?: 'AuthorizationResult'; value: boolean; message?: string | null };
    } | null;
    canDestroy: { __typename?: 'AuthorizationResult'; value: boolean; message?: string | null };
  }>;
};

export const DeepCategoriesDocument = gql`
  query DeepCategories($parentId: ID, $ids: [ID!]) {
    categories(parentId: $parentId, ids: $ids) {
      ...CategoryInfo
      parent {
        ...CategoryInfo
        parent {
          ...CategoryInfo
          parent {
            ...CategoryInfo
          }
        }
      }
    }
  }
  ${CategoryInfoFragmentDoc}
`;

/**
 * __useDeepCategoriesQuery__
 *
 * To run a query within a React component, call `useDeepCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeepCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeepCategoriesQuery({
 *   variables: {
 *      parentId: // value for 'parentId'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeepCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<DeepCategoriesQuery, DeepCategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DeepCategoriesQuery, DeepCategoriesQueryVariables>(
    DeepCategoriesDocument,
    options,
  );
}
export function useDeepCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DeepCategoriesQuery, DeepCategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DeepCategoriesQuery, DeepCategoriesQueryVariables>(
    DeepCategoriesDocument,
    options,
  );
}
export type DeepCategoriesQueryHookResult = ReturnType<typeof useDeepCategoriesQuery>;
export type DeepCategoriesLazyQueryHookResult = ReturnType<typeof useDeepCategoriesLazyQuery>;
export type DeepCategoriesQueryResult = Apollo.QueryResult<
  DeepCategoriesQuery,
  DeepCategoriesQueryVariables
>;
