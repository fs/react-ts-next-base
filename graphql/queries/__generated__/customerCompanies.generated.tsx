import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyInfoFragmentDoc } from '../../fragments/__generated__/companyInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CustomerCompaniesQueryVariables = Types.Exact<{
  companyIds?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  deleted?: Types.InputMaybe<Types.Scalars['Boolean']>;
  statuses?: Types.InputMaybe<Array<Types.CompanyStatusEnum> | Types.CompanyStatusEnum>;
  officialName?: Types.InputMaybe<Types.Scalars['String']>;
  directions?: Types.InputMaybe<Array<Types.CompanyDirectionEnum> | Types.CompanyDirectionEnum>;
  urgent?: Types.InputMaybe<Types.Scalars['Boolean']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type CustomerCompaniesQuery = {
  __typename?: 'Query';
  customerCompanies: {
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

export const CustomerCompaniesDocument = gql`
  query CustomerCompanies(
    $companyIds: [ID!]
    $deleted: Boolean
    $statuses: [CompanyStatusEnum!]
    $officialName: String
    $directions: [CompanyDirectionEnum!]
    $urgent: Boolean
    $first: Int
    $after: String
  ) {
    customerCompanies(
      companyIds: $companyIds
      deleted: $deleted
      statuses: $statuses
      officialName: $officialName
      directions: $directions
      urgent: $urgent
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
 * __useCustomerCompaniesQuery__
 *
 * To run a query within a React component, call `useCustomerCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerCompaniesQuery({
 *   variables: {
 *      companyIds: // value for 'companyIds'
 *      deleted: // value for 'deleted'
 *      statuses: // value for 'statuses'
 *      officialName: // value for 'officialName'
 *      directions: // value for 'directions'
 *      urgent: // value for 'urgent'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useCustomerCompaniesQuery(
  baseOptions?: Apollo.QueryHookOptions<CustomerCompaniesQuery, CustomerCompaniesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CustomerCompaniesQuery, CustomerCompaniesQueryVariables>(
    CustomerCompaniesDocument,
    options,
  );
}
export function useCustomerCompaniesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CustomerCompaniesQuery,
    CustomerCompaniesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CustomerCompaniesQuery, CustomerCompaniesQueryVariables>(
    CustomerCompaniesDocument,
    options,
  );
}
export type CustomerCompaniesQueryHookResult = ReturnType<typeof useCustomerCompaniesQuery>;
export type CustomerCompaniesLazyQueryHookResult = ReturnType<typeof useCustomerCompaniesLazyQuery>;
export type CustomerCompaniesQueryResult = Apollo.QueryResult<
  CustomerCompaniesQuery,
  CustomerCompaniesQueryVariables
>;
