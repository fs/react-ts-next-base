import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompanyRatingHistoryQueryVariables = Types.Exact<{
  companyId: Types.Scalars['ID'];
}>;

export type CompanyRatingHistoryQuery = {
  __typename?: 'Query';
  companyRatingHistory: Array<{ __typename?: 'RatingHistory'; date: any; rating?: number | null }>;
};

export const CompanyRatingHistoryDocument = gql`
  query CompanyRatingHistory($companyId: ID!) {
    companyRatingHistory(companyId: $companyId) {
      date
      rating
    }
  }
`;

/**
 * __useCompanyRatingHistoryQuery__
 *
 * To run a query within a React component, call `useCompanyRatingHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyRatingHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyRatingHistoryQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useCompanyRatingHistoryQuery(
  baseOptions: Apollo.QueryHookOptions<
    CompanyRatingHistoryQuery,
    CompanyRatingHistoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CompanyRatingHistoryQuery, CompanyRatingHistoryQueryVariables>(
    CompanyRatingHistoryDocument,
    options,
  );
}
export function useCompanyRatingHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CompanyRatingHistoryQuery,
    CompanyRatingHistoryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CompanyRatingHistoryQuery, CompanyRatingHistoryQueryVariables>(
    CompanyRatingHistoryDocument,
    options,
  );
}
export type CompanyRatingHistoryQueryHookResult = ReturnType<typeof useCompanyRatingHistoryQuery>;
export type CompanyRatingHistoryLazyQueryHookResult = ReturnType<
  typeof useCompanyRatingHistoryLazyQuery
>;
export type CompanyRatingHistoryQueryResult = Apollo.QueryResult<
  CompanyRatingHistoryQuery,
  CompanyRatingHistoryQueryVariables
>;
