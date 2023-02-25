import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DestroyCustomerProductMutationVariables = Types.Exact<{
  input: Types.DestroyProductInput;
}>;

export type DestroyCustomerProductMutation = {
  __typename?: 'Mutation';
  destroyCustomerProduct?: { __typename?: 'Product'; id: string } | null;
};

export const DestroyCustomerProductDocument = gql`
  mutation DestroyCustomerProduct($input: DestroyProductInput!) {
    destroyCustomerProduct(input: $input) {
      id
    }
  }
`;
export type DestroyCustomerProductMutationFn = Apollo.MutationFunction<
  DestroyCustomerProductMutation,
  DestroyCustomerProductMutationVariables
>;

/**
 * __useDestroyCustomerProductMutation__
 *
 * To run a mutation, you first call `useDestroyCustomerProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyCustomerProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyCustomerProductMutation, { data, loading, error }] = useDestroyCustomerProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDestroyCustomerProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DestroyCustomerProductMutation,
    DestroyCustomerProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DestroyCustomerProductMutation,
    DestroyCustomerProductMutationVariables
  >(DestroyCustomerProductDocument, options);
}
export type DestroyCustomerProductMutationHookResult = ReturnType<
  typeof useDestroyCustomerProductMutation
>;
export type DestroyCustomerProductMutationResult =
  Apollo.MutationResult<DestroyCustomerProductMutation>;
export type DestroyCustomerProductMutationOptions = Apollo.BaseMutationOptions<
  DestroyCustomerProductMutation,
  DestroyCustomerProductMutationVariables
>;
