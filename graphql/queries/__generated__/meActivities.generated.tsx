import * as Types from '../../types';

import { gql } from '@apollo/client';
import { ActivityFragmentDoc } from '../../fragments/__generated__/activityInfo.generated';
import { PageInfoFragmentDoc } from '../../fragments/__generated__/pageInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MeActivitiesQueryVariables = Types.Exact<{
  events?: Types.InputMaybe<Array<Types.ActivityEvent> | Types.ActivityEvent>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  before?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type MeActivitiesQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'CurrentUser';
    id: string;
    activities?: {
      __typename?: 'ActivityConnection';
      edges?: Array<{
        __typename?: 'ActivityEdge';
        cursor: string;
        node?: {
          __typename?: 'Activity';
          id: string;
          body: string;
          title: string;
          createdAt: string;
          event: Types.ActivityEvent;
          user: {
            __typename?: 'User';
            avatarUrl?: string | null;
            id: string;
            email: string;
            firstName?: string | null;
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
  } | null;
};

export const MeActivitiesDocument = gql`
  query MeActivities(
    $events: [ActivityEvent!]
    $last: Int
    $before: String
    $first: Int
    $after: String
  ) {
    me {
      id
      activities(events: $events, last: $last, before: $before, first: $first, after: $after) {
        edges {
          cursor
          node {
            ...Activity
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
  ${ActivityFragmentDoc}
  ${PageInfoFragmentDoc}
`;

/**
 * __useMeActivitiesQuery__
 *
 * To run a query within a React component, call `useMeActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeActivitiesQuery({
 *   variables: {
 *      events: // value for 'events'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useMeActivitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<MeActivitiesQuery, MeActivitiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeActivitiesQuery, MeActivitiesQueryVariables>(
    MeActivitiesDocument,
    options,
  );
}
export function useMeActivitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeActivitiesQuery, MeActivitiesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeActivitiesQuery, MeActivitiesQueryVariables>(
    MeActivitiesDocument,
    options,
  );
}
export type MeActivitiesQueryHookResult = ReturnType<typeof useMeActivitiesQuery>;
export type MeActivitiesLazyQueryHookResult = ReturnType<typeof useMeActivitiesLazyQuery>;
export type MeActivitiesQueryResult = Apollo.QueryResult<
  MeActivitiesQuery,
  MeActivitiesQueryVariables
>;
