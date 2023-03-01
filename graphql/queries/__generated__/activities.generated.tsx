import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CurrentUserInfoFragmentDoc } from '../../fragments/__generated__/currentUserInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActivitiesQueryVariables = Types.Exact<{
  events?: Types.InputMaybe<Array<Types.ActivityEvent> | Types.ActivityEvent>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  before?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type ActivitiesQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'CurrentUser';
    avatarUrl?: string | null;
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  } | null;
  activities?: {
    __typename?: 'ActivityConnection';
    edges?: Array<{
      __typename?: 'ActivityEdge';
      cursor: string;
      node?: {
        __typename?: 'Activity';
        body: string;
        createdAt: any;
        event: Types.ActivityEvent;
        id: string;
        title: string;
        user: {
          __typename?: 'User';
          avatarUrl?: string | null;
          email: string;
          firstName?: string | null;
          id: string;
          lastName?: string | null;
        };
      } | null;
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
  query Activities(
    $events: [ActivityEvent!]
    $last: Int
    $before: String
    $first: Int
    $after: String
  ) {
    me {
      ...CurrentUserInfo
    }
    activities(events: $events, last: $last, before: $before, first: $first, after: $after) {
      edges {
        cursor
        node {
          body
          createdAt
          event
          id
          title
          user {
            avatarUrl
            email
            firstName
            id
            lastName
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
  ${CurrentUserInfoFragmentDoc}
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
 *      events: // value for 'events'
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
