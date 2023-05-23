import * as Types from '../../types';

import { gql } from '@apollo/client';
import { PublicActivityFragmentDoc } from '../../fragments/__generated__/publicActivityInfo.generated';
import { PageInfoFragmentDoc } from '../../fragments/__generated__/pageInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActivitiesQueryVariables = Types.Exact<{
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  before?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type ActivitiesQuery = {
  __typename?: 'Query';
  activities?: {
    __typename?: 'PublicActivityConnection';
    edges?: Array<{
      __typename?: 'PublicActivityEdge';
      cursor: string;
      node?: { __typename?: 'PublicActivity'; body: string; id: string; title: string } | null;
    } | null> | null;
    pageInfo: {
      __typename?: 'PageInfo';
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
    };
  } | null;
};

export const ActivitiesDocument = gql`
  query Activities($last: Int, $before: String, $first: Int, $after: String) {
    activities(last: $last, before: $before, first: $first, after: $after) {
      edges {
        cursor
        node {
          ...PublicActivity
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
  ${PublicActivityFragmentDoc}
  ${PageInfoFragmentDoc}
`;

/**
 * __useActivitiesQuery__
 *
 * To run a query within a React component, call `useActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitiesQuery({
 *   variables: {
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useActivitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ActivitiesQuery, ActivitiesQueryVariables>(ActivitiesDocument, options);
}
export function useActivitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesQuery, ActivitiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ActivitiesQuery, ActivitiesQueryVariables>(
    ActivitiesDocument,
    options,
  );
}
export type ActivitiesQueryHookResult = ReturnType<typeof useActivitiesQuery>;
export type ActivitiesLazyQueryHookResult = ReturnType<typeof useActivitiesLazyQuery>;
export type ActivitiesQueryResult = Apollo.QueryResult<ActivitiesQuery, ActivitiesQueryVariables>;
