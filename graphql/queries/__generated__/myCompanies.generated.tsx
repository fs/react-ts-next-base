import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyInfoFragmentDoc } from '../../fragments/__generated__/companyInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MyCompaniesQueryVariables = Types.Exact<{
  roleIds?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  directions?: Types.InputMaybe<Array<Types.CompanyDirectionEnum> | Types.CompanyDirectionEnum>;
  companyIds?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  statuses?: Types.InputMaybe<Array<Types.CompanyStatusEnum> | Types.CompanyStatusEnum>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type MyCompaniesQuery = {
  __typename?: 'Query';
  myCompanies: {
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
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  };
};

export const MyCompaniesDocument = gql`
  query MyCompanies(
    $roleIds: [ID!]
    $directions: [CompanyDirectionEnum!]
    $companyIds: [ID!]
    $statuses: [CompanyStatusEnum!]
    $first: Int
    $after: String
  ) {
    myCompanies(
      roleIds: $roleIds
      directions: $directions
      companyIds: $companyIds
      statuses: $statuses
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
      }
    }
  }
  ${CompanyInfoFragmentDoc}
`;

/**
 * __useMyCompaniesQuery__
 *
 * To run a query within a React component, call `useMyCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCompaniesQuery({
 *   variables: {
 *      roleIds: // value for 'roleIds'
 *      directions: // value for 'directions'
 *      companyIds: // value for 'companyIds'
 *      statuses: // value for 'statuses'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useMyCompaniesQuery(
  baseOptions?: Apollo.QueryHookOptions<MyCompaniesQuery, MyCompaniesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyCompaniesQuery, MyCompaniesQueryVariables>(MyCompaniesDocument, options);
}
export function useMyCompaniesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyCompaniesQuery, MyCompaniesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyCompaniesQuery, MyCompaniesQueryVariables>(
    MyCompaniesDocument,
    options,
  );
}
export type MyCompaniesQueryHookResult = ReturnType<typeof useMyCompaniesQuery>;
export type MyCompaniesLazyQueryHookResult = ReturnType<typeof useMyCompaniesLazyQuery>;
export type MyCompaniesQueryResult = Apollo.QueryResult<
  MyCompaniesQuery,
  MyCompaniesQueryVariables
>;
