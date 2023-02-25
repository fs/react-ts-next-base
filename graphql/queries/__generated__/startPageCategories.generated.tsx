import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StartPageCategoriesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type StartPageCategoriesQuery = {
  __typename?: 'Query';
  startPageCategories: Array<{
    __typename?: 'Category';
    id: string;
    name: string;
    displayOnStartPage: boolean;
  }>;
};

export const StartPageCategoriesDocument = gql`
  query StartPageCategories {
    startPageCategories {
      id
      name
      displayOnStartPage
    }
  }
`;

/**
 * __useStartPageCategoriesQuery__
 *
 * To run a query within a React component, call `useStartPageCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStartPageCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStartPageCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useStartPageCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    StartPageCategoriesQuery,
    StartPageCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<StartPageCategoriesQuery, StartPageCategoriesQueryVariables>(
    StartPageCategoriesDocument,
    options,
  );
}
export function useStartPageCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    StartPageCategoriesQuery,
    StartPageCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<StartPageCategoriesQuery, StartPageCategoriesQueryVariables>(
    StartPageCategoriesDocument,
    options,
  );
}
export type StartPageCategoriesQueryHookResult = ReturnType<typeof useStartPageCategoriesQuery>;
export type StartPageCategoriesLazyQueryHookResult = ReturnType<
  typeof useStartPageCategoriesLazyQuery
>;
export type StartPageCategoriesQueryResult = Apollo.QueryResult<
  StartPageCategoriesQuery,
  StartPageCategoriesQueryVariables
>;
