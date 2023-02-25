import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProductManufacturersQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type ProductManufacturersQuery = {
  __typename?: 'Query';
  productManufacturers: {
    __typename?: 'ManufacturerConnection';
    edges?: Array<{
      __typename?: 'ManufacturerEdge';
      cursor: string;
      node?: { __typename?: 'Manufacturer'; name: string } | null;
    } | null> | null;
  };
};

export const ProductManufacturersDocument = gql`
  query ProductManufacturers($name: String) {
    productManufacturers(name: $name) {
      edges {
        cursor
        node {
          name
        }
      }
    }
  }
`;

/**
 * __useProductManufacturersQuery__
 *
 * To run a query within a React component, call `useProductManufacturersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductManufacturersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductManufacturersQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useProductManufacturersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ProductManufacturersQuery,
    ProductManufacturersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductManufacturersQuery, ProductManufacturersQueryVariables>(
    ProductManufacturersDocument,
    options,
  );
}
export function useProductManufacturersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductManufacturersQuery,
    ProductManufacturersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProductManufacturersQuery, ProductManufacturersQueryVariables>(
    ProductManufacturersDocument,
    options,
  );
}
export type ProductManufacturersQueryHookResult = ReturnType<typeof useProductManufacturersQuery>;
export type ProductManufacturersLazyQueryHookResult = ReturnType<
  typeof useProductManufacturersLazyQuery
>;
export type ProductManufacturersQueryResult = Apollo.QueryResult<
  ProductManufacturersQuery,
  ProductManufacturersQueryVariables
>;
