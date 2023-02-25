import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DestroyPropertyMutationVariables = Types.Exact<{
  input: Types.DestroyPropertyInput;
}>;

export type DestroyPropertyMutation = {
  __typename?: 'Mutation';
  destroyProperty?: { __typename?: 'Message'; message: string } | null;
};

export const DestroyPropertyDocument = gql`
  mutation DestroyProperty($input: DestroyPropertyInput!) {
    destroyProperty(input: $input) {
      message
    }
  }
`;
export type DestroyPropertyMutationFn = Apollo.MutationFunction<
  DestroyPropertyMutation,
  DestroyPropertyMutationVariables
>;

/**
 * __useDestroyPropertyMutation__
 *
 * To run a mutation, you first call `useDestroyPropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyPropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyPropertyMutation, { data, loading, error }] = useDestroyPropertyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDestroyPropertyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DestroyPropertyMutation,
    DestroyPropertyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DestroyPropertyMutation, DestroyPropertyMutationVariables>(
    DestroyPropertyDocument,
    options,
  );
}
export type DestroyPropertyMutationHookResult = ReturnType<typeof useDestroyPropertyMutation>;
export type DestroyPropertyMutationResult = Apollo.MutationResult<DestroyPropertyMutation>;
export type DestroyPropertyMutationOptions = Apollo.BaseMutationOptions<
  DestroyPropertyMutation,
  DestroyPropertyMutationVariables
>;
