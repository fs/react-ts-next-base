import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CategoryInfoFragmentDoc } from '../../fragments/__generated__/categoryInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CategoriesQueryVariables = Types.Exact<{
  parentId?: Types.InputMaybe<Types.Scalars['ID']>;
  ids?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
}>;

export type CategoriesQuery = {
  __typename?: 'Query';
  categories: Array<{
    __typename?: 'Category';
    depth: number;
    id: string;
    name: string;
    position: number;
    canDestroy: { __typename?: 'AuthorizationResult'; value: boolean; message?: string | null };
  }>;
};

export const CategoriesDocument = gql`
  query Categories($parentId: ID, $ids: [ID!]) {
    categories(parentId: $parentId, ids: $ids) {
      ...CategoryInfo
    }
  }
  ${CategoryInfoFragmentDoc}
`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      parentId: // value for 'parentId'
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
}
export function useCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    options,
  );
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
