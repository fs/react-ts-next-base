import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AdminsQueryVariables = Types.Exact<{
  ids?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
}>;

export type AdminsQuery = {
  __typename?: 'Query';
  admins: {
    __typename?: 'UserConnection';
    edges?: Array<{
      __typename?: 'UserEdge';
      cursor: string;
      node?: {
        __typename?: 'User';
        avatarUrl?: string | null;
        email: string;
        firstName?: string | null;
        id: string;
        lastName?: string | null;
        middleName?: string | null;
        phoneNumber?: string | null;
        systemRole?: Types.SystemRoleEnum | null;
        companyMembers: Array<{ __typename?: 'CompanyMember'; id: string }>;
      } | null;
    } | null> | null;
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  };
};

export const AdminsDocument = gql`
  query Admins($ids: [ID!]) {
    admins(ids: $ids) {
      edges {
        cursor
        node {
          avatarUrl
          companyMembers {
            id
          }
          email
          firstName
          id
          lastName
          middleName
          phoneNumber
          systemRole
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
 * __useAdminsQuery__
 *
 * To run a query within a React component, call `useAdminsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useAdminsQuery(
  baseOptions?: Apollo.QueryHookOptions<AdminsQuery, AdminsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AdminsQuery, AdminsQueryVariables>(AdminsDocument, options);
}
export function useAdminsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AdminsQuery, AdminsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AdminsQuery, AdminsQueryVariables>(AdminsDocument, options);
}
export type AdminsQueryHookResult = ReturnType<typeof useAdminsQuery>;
export type AdminsLazyQueryHookResult = ReturnType<typeof useAdminsLazyQuery>;
export type AdminsQueryResult = Apollo.QueryResult<AdminsQuery, AdminsQueryVariables>;
