import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOrderQuantityMutationVariables = Types.Exact<{
  input: Types.UpdateOrderQuantityInput;
}>;

export type UpdateOrderQuantityMutation = {
  __typename?: 'Mutation';
  updateOrderQuantity?: {
    __typename?: 'Order';
    id: string;
    itemPrice?: number | null;
    quantity: number;
    deliveryPrice: number;
  } | null;
};

export const UpdateOrderQuantityDocument = gql`
  mutation UpdateOrderQuantity($input: UpdateOrderQuantityInput!) {
    updateOrderQuantity(input: $input) {
      id
      itemPrice
      quantity
      deliveryPrice
    }
  }
`;
export type UpdateOrderQuantityMutationFn = Apollo.MutationFunction<
  UpdateOrderQuantityMutation,
  UpdateOrderQuantityMutationVariables
>;

/**
 * __useUpdateOrderQuantityMutation__
 *
 * To run a mutation, you first call `useUpdateOrderQuantityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderQuantityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderQuantityMutation, { data, loading, error }] = useUpdateOrderQuantityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrderQuantityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateOrderQuantityMutation,
    UpdateOrderQuantityMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateOrderQuantityMutation, UpdateOrderQuantityMutationVariables>(
    UpdateOrderQuantityDocument,
    options,
  );
}
export type UpdateOrderQuantityMutationHookResult = ReturnType<
  typeof useUpdateOrderQuantityMutation
>;
export type UpdateOrderQuantityMutationResult = Apollo.MutationResult<UpdateOrderQuantityMutation>;
export type UpdateOrderQuantityMutationOptions = Apollo.BaseMutationOptions<
  UpdateOrderQuantityMutation,
  UpdateOrderQuantityMutationVariables
>;
