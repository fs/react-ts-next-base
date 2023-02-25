import * as Types from '../../types';

import { gql } from '@apollo/client';
import { TransferInfoFragmentDoc } from '../../fragments/__generated__/transferInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TransfersQueryVariables = Types.Exact<{
  transferTypes?: Types.InputMaybe<Array<Types.TransferTypeEnum> | Types.TransferTypeEnum>;
  operationStatuses?: Types.InputMaybe<
    Array<Types.AccountOperationStatusEnum> | Types.AccountOperationStatusEnum
  >;
  searchQuery?: Types.InputMaybe<Types.Scalars['String']>;
  ids?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type TransfersQuery = {
  __typename?: 'Query';
  transfers: {
    __typename?: 'TransferConnection';
    edges?: Array<{
      __typename?: 'TransferEdge';
      node?: {
        __typename?: 'Transfer';
        amount: number;
        applicationUrl: string;
        createdAt: any;
        id: string;
        transferType: Types.TransferTypeEnum;
        vat: number;
        vatType: Types.TransferVatTypeEnum;
        accountOperation: {
          __typename?: 'AccountOperation';
          status: Types.AccountOperationStatusEnum;
        };
        company: {
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
          legalForm: {
            __typename?: 'CompanyLegalForm';
            id: string;
            name: string;
            shortName: string;
          };
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
        };
        invoice?: { __typename?: 'TransferInvoice'; url: string } | null;
      } | null;
    } | null> | null;
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  };
};

export const TransfersDocument = gql`
  query Transfers(
    $transferTypes: [TransferTypeEnum!]
    $operationStatuses: [AccountOperationStatusEnum!]
    $searchQuery: String
    $ids: [ID!]
    $first: Int
    $after: String
  ) {
    transfers(
      transferTypes: $transferTypes
      operationStatuses: $operationStatuses
      searchQuery: $searchQuery
      ids: $ids
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...TransferInfo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${TransferInfoFragmentDoc}
`;

/**
 * __useTransfersQuery__
 *
 * To run a query within a React component, call `useTransfersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransfersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransfersQuery({
 *   variables: {
 *      transferTypes: // value for 'transferTypes'
 *      operationStatuses: // value for 'operationStatuses'
 *      searchQuery: // value for 'searchQuery'
 *      ids: // value for 'ids'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useTransfersQuery(
  baseOptions?: Apollo.QueryHookOptions<TransfersQuery, TransfersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TransfersQuery, TransfersQueryVariables>(TransfersDocument, options);
}
export function useTransfersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TransfersQuery, TransfersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TransfersQuery, TransfersQueryVariables>(TransfersDocument, options);
}
export type TransfersQueryHookResult = ReturnType<typeof useTransfersQuery>;
export type TransfersLazyQueryHookResult = ReturnType<typeof useTransfersLazyQuery>;
export type TransfersQueryResult = Apollo.QueryResult<TransfersQuery, TransfersQueryVariables>;
