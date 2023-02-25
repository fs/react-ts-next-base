import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CategoryInfoFragmentDoc } from '../../fragments/__generated__/categoryInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CategoryQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;

export type CategoryQuery = {
  __typename?: 'Query';
  category: {
    __typename?: 'Category';
    depth: number;
    id: string;
    name: string;
    position: number;
    canDestroy: { __typename?: 'AuthorizationResult'; value: boolean; message?: string | null };
  };
};

export const CategoryDocument = gql`
  query Category($id: ID!) {
    category(id: $id) {
      ...CategoryInfo
    }
  }
  ${CategoryInfoFragmentDoc}
`;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCategoryQuery(
  baseOptions: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
}
export function useCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
}
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategoryQueryResult = Apollo.QueryResult<CategoryQuery, CategoryQueryVariables>;
