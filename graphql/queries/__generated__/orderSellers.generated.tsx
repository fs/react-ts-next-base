import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyInfoFragmentDoc } from '../../fragments/__generated__/companyInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OrderSellersQueryVariables = Types.Exact<{
  companyId: Types.Scalars['ID'];
  checkoutStatus?: Types.InputMaybe<Types.OrderCheckoutStatusEnum>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  before?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type OrderSellersQuery = {
  __typename?: 'Query';
  orderSellers: {
    __typename?: 'CompanyConnection';
    edges?: Array<{
      __typename?: 'CompanyEdge';
      cursor: string;
      node?: {
        __typename?: 'Company';
        id: string;
        inn: string;
        kpp: string;
        officialName: string;
        unofficialName: string;
        deliveredOrdersCount?: number | null;
        directorFullName: string;
        legalAddress: string;
        postcode: string;
        ogrn: string;
        oktmo: string;
        bankName: string;
        checkingAccount: string;
        correspondentAccount: string;
        bic: string;
        email: string;
        phoneNumber: string;
        direction: Types.CompanyDirectionEnum;
        logoUrl: string;
        main: boolean;
        rejectsCount: number;
        sellableProductsCount: number;
        status: Types.CompanyStatusEnum;
        taxationSystem?: Types.CompanyTaxationSystemEnum | null;
        rating?: number | null;
        receivedReviewsCount: number;
        createdAt: any;
        verificationDeadlineAt?: any | null;
        deletedAt?: any | null;
        deletionReason?: Types.CompanyDeletionReasonEnum | null;
        blacklistedAt?: any | null;
        legalForm: { __typename?: 'CompanyLegalForm'; id: string; name: string; shortName: string };
        companyConfirmationRecords: Array<{
          __typename?: 'ConfirmationRecord';
          id: string;
          attachmentUrl: string;
          originalFilename?: string | null;
        }>;
        companyMembers: Array<{
          __typename?: 'CompanyMember';
          id: string;
          user: { __typename?: 'User'; id: string };
          role: { __typename?: 'CompanyRole'; id: string; name: string };
        }>;
        myRole?: { __typename?: 'CompanyRole'; id: string; name: string } | null;
        rejectedFields: Array<{
          __typename?: 'CompanyRejectedField';
          comment: string;
          name: Types.CompanyFieldEnum;
        }>;
        lastEmployeeMembers: Array<{
          __typename?: 'CompanyMember';
          id: string;
          user: { __typename?: 'User'; id: string; email: string };
        }>;
      } | null;
    } | null> | null;
  };
};

export const OrderSellersDocument = gql`
  query OrderSellers(
    $companyId: ID!
    $checkoutStatus: OrderCheckoutStatusEnum
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    orderSellers(
      companyId: $companyId
      checkoutStatus: $checkoutStatus
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      edges {
        cursor
        node {
          ...CompanyInfo
        }
      }
    }
  }
  ${CompanyInfoFragmentDoc}
`;

/**
 * __useOrderSellersQuery__
 *
 * To run a query within a React component, call `useOrderSellersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderSellersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderSellersQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      checkoutStatus: // value for 'checkoutStatus'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useOrderSellersQuery(
  baseOptions: Apollo.QueryHookOptions<OrderSellersQuery, OrderSellersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OrderSellersQuery, OrderSellersQueryVariables>(
    OrderSellersDocument,
    options,
  );
}
export function useOrderSellersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OrderSellersQuery, OrderSellersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OrderSellersQuery, OrderSellersQueryVariables>(
    OrderSellersDocument,
    options,
  );
}
export type OrderSellersQueryHookResult = ReturnType<typeof useOrderSellersQuery>;
export type OrderSellersLazyQueryHookResult = ReturnType<typeof useOrderSellersLazyQuery>;
export type OrderSellersQueryResult = Apollo.QueryResult<
  OrderSellersQuery,
  OrderSellersQueryVariables
>;
