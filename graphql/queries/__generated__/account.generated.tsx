import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AccountQueryVariables = Types.Exact<{
  companyId: Types.Scalars['ID'];
}>;

export type AccountQuery = {
  __typename?: 'Query';
  account: { __typename?: 'Account'; balance: number; pendingAmount: number };
};

export const AccountDocument = gql`
  query Account($companyId: ID!) {
    account(companyId: $companyId) {
      balance
      pendingAmount
    }
  }
`;

/**
 * __useAccountQuery__
 *
 * To run a query within a React component, call `useAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useAccountQuery(
  baseOptions: Apollo.QueryHookOptions<AccountQuery, AccountQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
}
export function useAccountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AccountQuery, AccountQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
}
export type AccountQueryHookResult = ReturnType<typeof useAccountQuery>;
export type AccountLazyQueryHookResult = ReturnType<typeof useAccountLazyQuery>;
export type AccountQueryResult = Apollo.QueryResult<AccountQuery, AccountQueryVariables>;
