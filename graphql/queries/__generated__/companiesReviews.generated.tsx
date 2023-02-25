import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyReviewsInfoFragmentDoc } from '../../fragments/__generated__/companyReviewsInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompaniesReviewsQueryVariables = Types.Exact<{
  companyName?: Types.InputMaybe<Types.Scalars['String']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.CompanyReviewOrderEnum>;
}>;

export type CompaniesReviewsQuery = {
  __typename?: 'Query';
  companiesReviews: {
    __typename?: 'CompanyReviewConnection';
    edges?: Array<{
      __typename?: 'CompanyReviewEdge';
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
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  };
};

export const CompaniesReviewsDocument = gql`
  query CompaniesReviews(
    $companyName: String
    $after: String
    $first: Int
    $orderBy: CompanyReviewOrderEnum
  ) {
    companiesReviews(companyName: $companyName, after: $after, first: $first, orderBy: $orderBy) {
      edges {
        node {
          ...CompanyReviewsInfo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${CompanyReviewsInfoFragmentDoc}
`;

/**
 * __useCompaniesReviewsQuery__
 *
 * To run a query within a React component, call `useCompaniesReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesReviewsQuery({
 *   variables: {
 *      companyName: // value for 'companyName'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useCompaniesReviewsQuery(
  baseOptions?: Apollo.QueryHookOptions<CompaniesReviewsQuery, CompaniesReviewsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CompaniesReviewsQuery, CompaniesReviewsQueryVariables>(
    CompaniesReviewsDocument,
    options,
  );
}
export function useCompaniesReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CompaniesReviewsQuery, CompaniesReviewsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CompaniesReviewsQuery, CompaniesReviewsQueryVariables>(
    CompaniesReviewsDocument,
    options,
  );
}
export type CompaniesReviewsQueryHookResult = ReturnType<typeof useCompaniesReviewsQuery>;
export type CompaniesReviewsLazyQueryHookResult = ReturnType<typeof useCompaniesReviewsLazyQuery>;
export type CompaniesReviewsQueryResult = Apollo.QueryResult<
  CompaniesReviewsQuery,
  CompaniesReviewsQueryVariables
>;
