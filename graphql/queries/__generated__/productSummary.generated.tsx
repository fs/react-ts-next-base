import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProductsSummaryQueryVariables = Types.Exact<{
  companyIds?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  categoryIds?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  manufacturer?: Types.InputMaybe<Types.Scalars['String']>;
  searchQuery?: Types.InputMaybe<Types.Scalars['String']>;
  minPrice?: Types.InputMaybe<Types.Scalars['Int']>;
  maxPrice?: Types.InputMaybe<Types.Scalars['Int']>;
  dictionaryProperties?: Types.InputMaybe<
    Array<Types.DictionaryPropertyFilterInput> | Types.DictionaryPropertyFilterInput
  >;
  integerProperties?: Types.InputMaybe<
    Array<Types.IntegerPropertyFilterInput> | Types.IntegerPropertyFilterInput
  >;
  rating?: Types.InputMaybe<Types.Scalars['Int']>;
  companyRating?: Types.InputMaybe<Types.Scalars['Int']>;
  freeDeliveryCompanyId?: Types.InputMaybe<Types.Scalars['ID']>;
  newest?: Types.InputMaybe<Types.Scalars['Boolean']>;
  condition?: Types.InputMaybe<Types.ConditionEnum>;
  vatPresence?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;

export type ProductsSummaryQuery = {
  __typename?: 'Query';
  productsSummary: { __typename?: 'ProductsSummary'; totalCount: number };
};

export const ProductsSummaryDocument = gql`
  query ProductsSummary(
    $companyIds: [ID!]
    $categoryIds: [ID!]
    $manufacturer: String
    $searchQuery: String
    $minPrice: Int
    $maxPrice: Int
    $dictionaryProperties: [DictionaryPropertyFilterInput!]
    $integerProperties: [IntegerPropertyFilterInput!]
    $rating: Int
    $companyRating: Int
    $freeDeliveryCompanyId: ID
    $newest: Boolean
    $condition: ConditionEnum
    $vatPresence: Boolean
  ) {
    productsSummary(
      manufacturer: $manufacturer
      searchQuery: $searchQuery
      minPrice: $minPrice
      maxPrice: $maxPrice
      companyIds: $companyIds
      categoryIds: $categoryIds
      dictionaryProperties: $dictionaryProperties
      integerProperties: $integerProperties
      rating: $rating
      companyRating: $companyRating
      freeDeliveryCompanyId: $freeDeliveryCompanyId
      newest: $newest
      condition: $condition
      vatPresence: $vatPresence
    ) {
      totalCount
    }
  }
`;

/**
 * __useProductsSummaryQuery__
 *
 * To run a query within a React component, call `useProductsSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsSummaryQuery({
 *   variables: {
 *      companyIds: // value for 'companyIds'
 *      categoryIds: // value for 'categoryIds'
 *      manufacturer: // value for 'manufacturer'
 *      searchQuery: // value for 'searchQuery'
 *      minPrice: // value for 'minPrice'
 *      maxPrice: // value for 'maxPrice'
 *      dictionaryProperties: // value for 'dictionaryProperties'
 *      integerProperties: // value for 'integerProperties'
 *      rating: // value for 'rating'
 *      companyRating: // value for 'companyRating'
 *      freeDeliveryCompanyId: // value for 'freeDeliveryCompanyId'
 *      newest: // value for 'newest'
 *      condition: // value for 'condition'
 *      vatPresence: // value for 'vatPresence'
 *   },
 * });
 */
export function useProductsSummaryQuery(
  baseOptions?: Apollo.QueryHookOptions<ProductsSummaryQuery, ProductsSummaryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductsSummaryQuery, ProductsSummaryQueryVariables>(
    ProductsSummaryDocument,
    options,
  );
}
export function useProductsSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProductsSummaryQuery, ProductsSummaryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProductsSummaryQuery, ProductsSummaryQueryVariables>(
    ProductsSummaryDocument,
    options,
  );
}
export type ProductsSummaryQueryHookResult = ReturnType<typeof useProductsSummaryQuery>;
export type ProductsSummaryLazyQueryHookResult = ReturnType<typeof useProductsSummaryLazyQuery>;
export type ProductsSummaryQueryResult = Apollo.QueryResult<
  ProductsSummaryQuery,
  ProductsSummaryQueryVariables
>;
