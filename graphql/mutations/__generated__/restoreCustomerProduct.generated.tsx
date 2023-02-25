import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RestoreCustomerProductMutationVariables = Types.Exact<{
  input: Types.RestoreProductInput;
}>;

export type RestoreCustomerProductMutation = {
  __typename?: 'Mutation';
  restoreCustomerProduct?: { __typename?: 'Product'; id: string } | null;
};

export const RestoreCustomerProductDocument = gql`
  mutation restoreCustomerProduct($input: RestoreProductInput!) {
    restoreCustomerProduct(input: $input) {
      id
    }
  }
`;
export type RestoreCustomerProductMutationFn = Apollo.MutationFunction<
  RestoreCustomerProductMutation,
  RestoreCustomerProductMutationVariables
>;

/**
 * __useRestoreCustomerProductMutation__
 *
 * To run a mutation, you first call `useRestoreCustomerProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreCustomerProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreCustomerProductMutation, { data, loading, error }] = useRestoreCustomerProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRestoreCustomerProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RestoreCustomerProductMutation,
    RestoreCustomerProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RestoreCustomerProductMutation,
    RestoreCustomerProductMutationVariables
  >(RestoreCustomerProductDocument, options);
}
export type RestoreCustomerProductMutationHookResult = ReturnType<
  typeof useRestoreCustomerProductMutation
>;
export type RestoreCustomerProductMutationResult =
  Apollo.MutationResult<RestoreCustomerProductMutation>;
export type RestoreCustomerProductMutationOptions = Apollo.BaseMutationOptions<
  RestoreCustomerProductMutation,
  RestoreCustomerProductMutationVariables
>;
