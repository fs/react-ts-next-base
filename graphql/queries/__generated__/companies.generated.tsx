import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyInfoFragmentDoc } from '../../fragments/__generated__/companyInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompaniesQueryVariables = Types.Exact<{
  companyIds?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  searchQuery?: Types.InputMaybe<Types.Scalars['String']>;
  statuses?: Types.InputMaybe<Array<Types.CompanyStatusEnum> | Types.CompanyStatusEnum>;
  directions?: Types.InputMaybe<Array<Types.CompanyDirectionEnum> | Types.CompanyDirectionEnum>;
  orderBy?: Types.InputMaybe<Types.CompanyOrderEnum>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type CompaniesQuery = {
  __typename?: 'Query';
  companies: {
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
    pageInfo: {
      __typename?: 'PageInfo';
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | null;
    };
  };
};

export const CompaniesDocument = gql`
  query Companies(
    $companyIds: [ID!]
    $searchQuery: String
    $statuses: [CompanyStatusEnum!]
    $directions: [CompanyDirectionEnum!]
    $orderBy: CompanyOrderEnum
    $first: Int
    $after: String
  ) {
    companies(
      companyIds: $companyIds
      searchQuery: $searchQuery
      statuses: $statuses
      directions: $directions
      orderBy: $orderBy
      first: $first
      after: $after
    ) {
      edges {
        cursor
        node {
          ...CompanyInfo
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
  ${CompanyInfoFragmentDoc}
`;

/**
 * __useCompaniesQuery__
 *
 * To run a query within a React component, call `useCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesQuery({
 *   variables: {
 *      companyIds: // value for 'companyIds'
 *      searchQuery: // value for 'searchQuery'
 *      statuses: // value for 'statuses'
 *      directions: // value for 'directions'
 *      orderBy: // value for 'orderBy'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useCompaniesQuery(
  baseOptions?: Apollo.QueryHookOptions<CompaniesQuery, CompaniesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
}
export function useCompaniesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CompaniesQuery, CompaniesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
}
export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>;
export type CompaniesLazyQueryHookResult = ReturnType<typeof useCompaniesLazyQuery>;
export type CompaniesQueryResult = Apollo.QueryResult<CompaniesQuery, CompaniesQueryVariables>;
