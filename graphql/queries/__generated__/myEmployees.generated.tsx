import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyInfoFragmentDoc } from '../../fragments/__generated__/companyInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MyEmployeesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MyEmployeesQuery = {
  __typename?: 'Query';
  myEmployees: {
    __typename?: 'UserConnection';
    edges?: Array<{
      __typename?: 'UserEdge';
      node?: {
        __typename?: 'User';
        id: string;
        email: string;
        companyMembers: Array<{
          __typename?: 'CompanyMember';
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
        }>;
      } | null;
    } | null> | null;
  };
};

export const MyEmployeesDocument = gql`
  query MyEmployees {
    myEmployees {
      edges {
        node {
          id
          email
          companyMembers {
            company {
              ...CompanyInfo
            }
          }
        }
      }
    }
  }
  ${CompanyInfoFragmentDoc}
`;

/**
 * __useMyEmployeesQuery__
 *
 * To run a query within a React component, call `useMyEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyEmployeesQuery(
  baseOptions?: Apollo.QueryHookOptions<MyEmployeesQuery, MyEmployeesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyEmployeesQuery, MyEmployeesQueryVariables>(MyEmployeesDocument, options);
}
export function useMyEmployeesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyEmployeesQuery, MyEmployeesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyEmployeesQuery, MyEmployeesQueryVariables>(
    MyEmployeesDocument,
    options,
  );
}
export type MyEmployeesQueryHookResult = ReturnType<typeof useMyEmployeesQuery>;
export type MyEmployeesLazyQueryHookResult = ReturnType<typeof useMyEmployeesLazyQuery>;
export type MyEmployeesQueryResult = Apollo.QueryResult<
  MyEmployeesQuery,
  MyEmployeesQueryVariables
>;
