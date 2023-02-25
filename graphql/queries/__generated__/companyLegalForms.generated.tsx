import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompanyLegalFormsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CompanyLegalFormsQuery = {
  __typename?: 'Query';
  companyLegalForms: Array<{
    __typename?: 'CompanyLegalForm';
    id: string;
    name: string;
    shortName: string;
  }>;
};

export const CompanyLegalFormsDocument = gql`
  query CompanyLegalForms {
    companyLegalForms {
      id
      name
      shortName
    }
  }
`;

/**
 * __useCompanyLegalFormsQuery__
 *
 * To run a query within a React component, call `useCompanyLegalFormsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyLegalFormsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyLegalFormsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompanyLegalFormsQuery(
  baseOptions?: Apollo.QueryHookOptions<CompanyLegalFormsQuery, CompanyLegalFormsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CompanyLegalFormsQuery, CompanyLegalFormsQueryVariables>(
    CompanyLegalFormsDocument,
    options,
  );
}
export function useCompanyLegalFormsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CompanyLegalFormsQuery,
    CompanyLegalFormsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CompanyLegalFormsQuery, CompanyLegalFormsQueryVariables>(
    CompanyLegalFormsDocument,
    options,
  );
}
export type CompanyLegalFormsQueryHookResult = ReturnType<typeof useCompanyLegalFormsQuery>;
export type CompanyLegalFormsLazyQueryHookResult = ReturnType<typeof useCompanyLegalFormsLazyQuery>;
export type CompanyLegalFormsQueryResult = Apollo.QueryResult<
  CompanyLegalFormsQuery,
  CompanyLegalFormsQueryVariables
>;
