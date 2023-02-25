import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DestroyOrderMutationVariables = Types.Exact<{
  input: Types.DestroyOrderInput;
}>;

export type DestroyOrderMutation = {
  __typename?: 'Mutation';
  destroyOrder?: { __typename?: 'Message'; message: string } | null;
};

export const DestroyOrderDocument = gql`
  mutation DestroyOrder($input: DestroyOrderInput!) {
    destroyOrder(input: $input) {
      message
    }
  }
`;
export type DestroyOrderMutationFn = Apollo.MutationFunction<
  DestroyOrderMutation,
  DestroyOrderMutationVariables
>;

/**
 * __useDestroyOrderMutation__
 *
 * To run a mutation, you first call `useDestroyOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyOrderMutation, { data, loading, error }] = useDestroyOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDestroyOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<DestroyOrderMutation, DestroyOrderMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DestroyOrderMutation, DestroyOrderMutationVariables>(
    DestroyOrderDocument,
    options,
  );
}
export type DestroyOrderMutationHookResult = ReturnType<typeof useDestroyOrderMutation>;
export type DestroyOrderMutationResult = Apollo.MutationResult<DestroyOrderMutation>;
export type DestroyOrderMutationOptions = Apollo.BaseMutationOptions<
  DestroyOrderMutation,
  DestroyOrderMutationVariables
>;
