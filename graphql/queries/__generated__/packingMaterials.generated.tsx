import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PackingMaterialsQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type PackingMaterialsQuery = {
  __typename?: 'Query';
  packingMaterials: {
    __typename?: 'PackingMaterialConnection';
    edges?: Array<{
      __typename?: 'PackingMaterialEdge';
      cursor: string;
      node?: { __typename?: 'PackingMaterial'; id: string; name: string } | null;
    } | null> | null;
  };
};

export const PackingMaterialsDocument = gql`
  query PackingMaterials($name: String) {
    packingMaterials(name: $name) {
      edges {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`;

/**
 * __usePackingMaterialsQuery__
 *
 * To run a query within a React component, call `usePackingMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePackingMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePackingMaterialsQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function usePackingMaterialsQuery(
  baseOptions?: Apollo.QueryHookOptions<PackingMaterialsQuery, PackingMaterialsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PackingMaterialsQuery, PackingMaterialsQueryVariables>(
    PackingMaterialsDocument,
    options,
  );
}
export function usePackingMaterialsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PackingMaterialsQuery, PackingMaterialsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PackingMaterialsQuery, PackingMaterialsQueryVariables>(
    PackingMaterialsDocument,
    options,
  );
}
export type PackingMaterialsQueryHookResult = ReturnType<typeof usePackingMaterialsQuery>;
export type PackingMaterialsLazyQueryHookResult = ReturnType<typeof usePackingMaterialsLazyQuery>;
export type PackingMaterialsQueryResult = Apollo.QueryResult<
  PackingMaterialsQuery,
  PackingMaterialsQueryVariables
>;
