import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyReviewsInfoFragmentDoc } from '../../fragments/__generated__/companyReviewsInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SellerCompanyReviewsQueryVariables = Types.Exact<{
  sellerCompanyId: Types.Scalars['ID'];
  after?: Types.InputMaybe<Types.Scalars['String']>;
  before?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type SellerCompanyReviewsQuery = {
  __typename?: 'Query';
  sellerCompanyReviews: {
    __typename?: 'CompanyReviewConnection';
    edges?: Array<{
      __typename?: 'CompanyReviewEdge';
      cursor: string;
      node?: {
        __typename?: 'CompanyReview';
        companyBody: string;
        companyRating: number;
        id: string;
        createdAt: any;
        buyer: {
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
        seller: {
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
      } | null;
    } | null> | null;
    pageInfo: {
      __typename?: 'PageInfo';
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
    };
  };
};

export const SellerCompanyReviewsDocument = gql`
  query SellerCompanyReviews(
    $sellerCompanyId: ID!
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    sellerCompanyReviews(
      sellerCompanyId: $sellerCompanyId
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      edges {
        cursor
        node {
          ...CompanyReviewsInfo
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
  ${CompanyReviewsInfoFragmentDoc}
`;

/**
 * __useSellerCompanyReviewsQuery__
 *
 * To run a query within a React component, call `useSellerCompanyReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSellerCompanyReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSellerCompanyReviewsQuery({
 *   variables: {
 *      sellerCompanyId: // value for 'sellerCompanyId'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useSellerCompanyReviewsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SellerCompanyReviewsQuery,
    SellerCompanyReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SellerCompanyReviewsQuery, SellerCompanyReviewsQueryVariables>(
    SellerCompanyReviewsDocument,
    options,
  );
}
export function useSellerCompanyReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SellerCompanyReviewsQuery,
    SellerCompanyReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SellerCompanyReviewsQuery, SellerCompanyReviewsQueryVariables>(
    SellerCompanyReviewsDocument,
    options,
  );
}
export type SellerCompanyReviewsQueryHookResult = ReturnType<typeof useSellerCompanyReviewsQuery>;
export type SellerCompanyReviewsLazyQueryHookResult = ReturnType<
  typeof useSellerCompanyReviewsLazyQuery
>;
export type SellerCompanyReviewsQueryResult = Apollo.QueryResult<
  SellerCompanyReviewsQuery,
  SellerCompanyReviewsQueryVariables
>;
