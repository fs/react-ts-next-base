import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CustomerAccountOperationsQueryVariables = Types.Exact<{
  statuses?: Types.InputMaybe<
    Array<Types.AccountOperationStatusEnum> | Types.AccountOperationStatusEnum
  >;
  searchQuery?: Types.InputMaybe<Types.Scalars['String']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type CustomerAccountOperationsQuery = {
  __typename?: 'Query';
  customerAccountOperations: {
    __typename?: 'AccountOperationConnection';
    edges?: Array<{
      __typename?: 'AccountOperationEdge';
      cursor: string;
      node?: {
        __typename?: 'AccountOperation';
        id: string;
        acceptedAt?: any | null;
        amount: number;
        operationType: Types.AccountOperationTypeEnum;
        originId: string;
        originType: Types.AccountOperationOriginTypeEnum;
        status: Types.AccountOperationStatusEnum;
        subject: Types.AccountOperationSubjectEnum;
      } | null;
    } | null> | null;
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  };
};

export const CustomerAccountOperationsDocument = gql`
  query CustomerAccountOperations(
    $statuses: [AccountOperationStatusEnum!]
    $searchQuery: String
    $after: String
    $first: Int
  ) {
    customerAccountOperations(
      statuses: $statuses
      searchQuery: $searchQuery
      after: $after
      first: $first
    ) {
      edges {
        cursor
        node {
          id
          acceptedAt
          amount
          operationType
          originId
          originType
          status
          subject
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
 * __useCustomerAccountOperationsQuery__
 *
 * To run a query within a React component, call `useCustomerAccountOperationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerAccountOperationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerAccountOperationsQuery({
 *   variables: {
 *      statuses: // value for 'statuses'
 *      searchQuery: // value for 'searchQuery'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useCustomerAccountOperationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CustomerAccountOperationsQuery,
    CustomerAccountOperationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CustomerAccountOperationsQuery, CustomerAccountOperationsQueryVariables>(
    CustomerAccountOperationsDocument,
    options,
  );
}
export function useCustomerAccountOperationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CustomerAccountOperationsQuery,
    CustomerAccountOperationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CustomerAccountOperationsQuery,
    CustomerAccountOperationsQueryVariables
  >(CustomerAccountOperationsDocument, options);
}
export type CustomerAccountOperationsQueryHookResult = ReturnType<
  typeof useCustomerAccountOperationsQuery
>;
export type CustomerAccountOperationsLazyQueryHookResult = ReturnType<
  typeof useCustomerAccountOperationsLazyQuery
>;
export type CustomerAccountOperationsQueryResult = Apollo.QueryResult<
  CustomerAccountOperationsQuery,
  CustomerAccountOperationsQueryVariables
>;
