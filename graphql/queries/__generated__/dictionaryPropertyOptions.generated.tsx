import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DictionaryPropertyOptionsQueryVariables = Types.Exact<{
  propertyId: Types.Scalars['ID'];
}>;

export type DictionaryPropertyOptionsQuery = {
  __typename?: 'Query';
  dictionaryPropertyOptions: Array<{
    __typename?: 'DictionaryPropertyOption';
    id: string;
    name: string;
  }>;
};

export const DictionaryPropertyOptionsDocument = gql`
  query DictionaryPropertyOptions($propertyId: ID!) {
    dictionaryPropertyOptions(propertyId: $propertyId) {
      id
      name
    }
  }
`;

/**
 * __useDictionaryPropertyOptionsQuery__
 *
 * To run a query within a React component, call `useDictionaryPropertyOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDictionaryPropertyOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDictionaryPropertyOptionsQuery({
 *   variables: {
 *      propertyId: // value for 'propertyId'
 *   },
 * });
 */
export function useDictionaryPropertyOptionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    DictionaryPropertyOptionsQuery,
    DictionaryPropertyOptionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DictionaryPropertyOptionsQuery, DictionaryPropertyOptionsQueryVariables>(
    DictionaryPropertyOptionsDocument,
    options,
  );
}
export function useDictionaryPropertyOptionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DictionaryPropertyOptionsQuery,
    DictionaryPropertyOptionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    DictionaryPropertyOptionsQuery,
    DictionaryPropertyOptionsQueryVariables
  >(DictionaryPropertyOptionsDocument, options);
}
export type DictionaryPropertyOptionsQueryHookResult = ReturnType<
  typeof useDictionaryPropertyOptionsQuery
>;
export type DictionaryPropertyOptionsLazyQueryHookResult = ReturnType<
  typeof useDictionaryPropertyOptionsLazyQuery
>;
export type DictionaryPropertyOptionsQueryResult = Apollo.QueryResult<
  DictionaryPropertyOptionsQuery,
  DictionaryPropertyOptionsQueryVariables
>;
