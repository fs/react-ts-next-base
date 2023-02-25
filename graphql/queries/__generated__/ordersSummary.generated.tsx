import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OrdersSummaryQueryVariables = Types.Exact<{
  companyId: Types.Scalars['ID'];
  checkoutStatus?: Types.InputMaybe<Types.OrderCheckoutStatusEnum>;
  sellerIds?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  deleted?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;

export type OrdersSummaryQuery = {
  __typename?: 'Query';
  ordersSummary: { __typename?: 'OrdersSummary'; totalCount: number };
};

export const OrdersSummaryDocument = gql`
  query OrdersSummary(
    $companyId: ID!
    $checkoutStatus: OrderCheckoutStatusEnum
    $sellerIds: [ID!]
    $deleted: Boolean
  ) {
    ordersSummary(
      companyId: $companyId
      checkoutStatus: $checkoutStatus
      sellerIds: $sellerIds
      deleted: $deleted
    ) {
      totalCount
    }
  }
`;

/**
 * __useOrdersSummaryQuery__
 *
 * To run a query within a React component, call `useOrdersSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersSummaryQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      checkoutStatus: // value for 'checkoutStatus'
 *      sellerIds: // value for 'sellerIds'
 *      deleted: // value for 'deleted'
 *   },
 * });
 */
export function useOrdersSummaryQuery(
  baseOptions: Apollo.QueryHookOptions<OrdersSummaryQuery, OrdersSummaryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OrdersSummaryQuery, OrdersSummaryQueryVariables>(
    OrdersSummaryDocument,
    options,
  );
}
export function useOrdersSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OrdersSummaryQuery, OrdersSummaryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OrdersSummaryQuery, OrdersSummaryQueryVariables>(
    OrdersSummaryDocument,
    options,
  );
}
export type OrdersSummaryQueryHookResult = ReturnType<typeof useOrdersSummaryQuery>;
export type OrdersSummaryLazyQueryHookResult = ReturnType<typeof useOrdersSummaryLazyQuery>;
export type OrdersSummaryQueryResult = Apollo.QueryResult<
  OrdersSummaryQuery,
  OrdersSummaryQueryVariables
>;
