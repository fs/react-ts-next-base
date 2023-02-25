import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConfirmProductMutationVariables = Types.Exact<{
  input: Types.ConfirmProductInput;
}>;

export type ConfirmProductMutation = {
  __typename?: 'Mutation';
  confirmProduct?: { __typename?: 'Product'; id: string } | null;
};

export const ConfirmProductDocument = gql`
  mutation confirmProduct($input: ConfirmProductInput!) {
    confirmProduct(input: $input) {
      id
    }
  }
`;
export type ConfirmProductMutationFn = Apollo.MutationFunction<
  ConfirmProductMutation,
  ConfirmProductMutationVariables
>;

/**
 * __useConfirmProductMutation__
 *
 * To run a mutation, you first call `useConfirmProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmProductMutation, { data, loading, error }] = useConfirmProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfirmProductMutation(
  baseOptions?: Apollo.MutationHookOptions<ConfirmProductMutation, ConfirmProductMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ConfirmProductMutation, ConfirmProductMutationVariables>(
    ConfirmProductDocument,
    options,
  );
}
export type ConfirmProductMutationHookResult = ReturnType<typeof useConfirmProductMutation>;
export type ConfirmProductMutationResult = Apollo.MutationResult<ConfirmProductMutation>;
export type ConfirmProductMutationOptions = Apollo.BaseMutationOptions<
  ConfirmProductMutation,
  ConfirmProductMutationVariables
>;
