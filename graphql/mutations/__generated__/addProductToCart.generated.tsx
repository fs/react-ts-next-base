import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddProductToCartMutationVariables = Types.Exact<{
  input: Types.AddProductToCartInput;
}>;

export type AddProductToCartMutation = {
  __typename?: 'Mutation';
  addProductToCart?: {
    __typename?: 'Order';
    id: string;
    seller: { __typename?: 'Company'; id: string };
    product: { __typename?: 'Product'; id: string; name?: string | null };
  } | null;
};

export const AddProductToCartDocument = gql`
  mutation AddProductToCart($input: AddProductToCartInput!) {
    addProductToCart(input: $input) {
      id
      seller {
        id
      }
      product {
        id
        name
      }
    }
  }
`;
export type AddProductToCartMutationFn = Apollo.MutationFunction<
  AddProductToCartMutation,
  AddProductToCartMutationVariables
>;

/**
 * __useAddProductToCartMutation__
 *
 * To run a mutation, you first call `useAddProductToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductToCartMutation, { data, loading, error }] = useAddProductToCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddProductToCartMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProductToCartMutation,
    AddProductToCartMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddProductToCartMutation, AddProductToCartMutationVariables>(
    AddProductToCartDocument,
    options,
  );
}
export type AddProductToCartMutationHookResult = ReturnType<typeof useAddProductToCartMutation>;
export type AddProductToCartMutationResult = Apollo.MutationResult<AddProductToCartMutation>;
export type AddProductToCartMutationOptions = Apollo.BaseMutationOptions<
  AddProductToCartMutation,
  AddProductToCartMutationVariables
>;
