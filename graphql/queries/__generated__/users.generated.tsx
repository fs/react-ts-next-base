import * as Types from '../../types';

import { gql } from '@apollo/client';
import { UserInfoFragmentDoc } from '../../fragments/__generated__/userInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UsersQueryVariables = Types.Exact<{
  ids?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  orderBy?: Types.InputMaybe<Types.UserOrderEnum>;
  searchQuery?: Types.InputMaybe<Types.Scalars['String']>;
  blocked?: Types.InputMaybe<Types.Scalars['Boolean']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  before?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type UsersQuery = {
  __typename?: 'Query';
  users: {
    __typename?: 'UserConnection';
    edges?: Array<{
      __typename?: 'UserEdge';
      cursor: string;
      node?: {
        __typename?: 'User';
        id: string;
        avatarUrl?: string | null;
        blockedAt?: any | null;
        createdAt: any;
        email: string;
        firstName?: string | null;
        fullName?: string | null;
        lastName?: string | null;
        middleName?: string | null;
        phoneNumber?: string | null;
        systemRole?: Types.SystemRoleEnum | null;
        companyMembers: Array<{
          __typename?: 'CompanyMember';
          id: string;
          user: { __typename?: 'User'; id: string };
          role: { __typename?: 'CompanyRole'; id: string; name: string };
          company: {
            __typename?: 'Company';
            id: string;
            unofficialName: string;
            officialName: string;
          };
        }>;
        role?: { __typename?: 'CompanyRole'; id: string; name: string } | null;
      } | null;
    } | null> | null;
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  };
};

export const UsersDocument = gql`
  query Users(
    $ids: [ID!]
    $orderBy: UserOrderEnum
    $searchQuery: String
    $blocked: Boolean
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    users(
      ids: $ids
      searchQuery: $searchQuery
      blocked: $blocked
      after: $after
      before: $before
      orderBy: $orderBy
      first: $first
      last: $last
    ) {
      edges {
        cursor
        node {
          ...UserInfo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${UserInfoFragmentDoc}
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *      orderBy: // value for 'orderBy'
 *      searchQuery: // value for 'searchQuery'
 *      blocked: // value for 'blocked'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
