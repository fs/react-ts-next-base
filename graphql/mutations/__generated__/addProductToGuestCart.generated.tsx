import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddProductToGuestCartMutationVariables = Types.Exact<{
  input: Types.AddProductToGuestCartInput;
}>;

export type AddProductToGuestCartMutation = {
  __typename?: 'Mutation';
  addProductToGuestCart?: {
    __typename?: 'Order';
    id: string;
    seller: { __typename?: 'Company'; id: string };
    product: { __typename?: 'Product'; id: string; name?: string | null };
  } | null;
};

export const AddProductToGuestCartDocument = gql`
  mutation AddProductToGuestCart($input: AddProductToGuestCartInput!) {
    addProductToGuestCart(input: $input) {
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
export type AddProductToGuestCartMutationFn = Apollo.MutationFunction<
  AddProductToGuestCartMutation,
  AddProductToGuestCartMutationVariables
>;

/**
 * __useAddProductToGuestCartMutation__
 *
 * To run a mutation, you first call `useAddProductToGuestCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductToGuestCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductToGuestCartMutation, { data, loading, error }] = useAddProductToGuestCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddProductToGuestCartMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProductToGuestCartMutation,
    AddProductToGuestCartMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddProductToGuestCartMutation, AddProductToGuestCartMutationVariables>(
    AddProductToGuestCartDocument,
    options,
  );
}
export type AddProductToGuestCartMutationHookResult = ReturnType<
  typeof useAddProductToGuestCartMutation
>;
export type AddProductToGuestCartMutationResult =
  Apollo.MutationResult<AddProductToGuestCartMutation>;
export type AddProductToGuestCartMutationOptions = Apollo.BaseMutationOptions<
  AddProductToGuestCartMutation,
  AddProductToGuestCartMutationVariables
>;
