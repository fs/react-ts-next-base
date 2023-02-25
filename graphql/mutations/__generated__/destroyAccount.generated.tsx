import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DestroyAccountMutationVariables = Types.Exact<{ [key: string]: never }>;

export type DestroyAccountMutation = {
  __typename?: 'Mutation';
  destroyAccount?: { __typename?: 'DestroyAccountPayload'; message: string } | null;
};

export const DestroyAccountDocument = gql`
  mutation DestroyAccount {
    destroyAccount {
      message
    }
  }
`;
export type DestroyAccountMutationFn = Apollo.MutationFunction<
  DestroyAccountMutation,
  DestroyAccountMutationVariables
>;

/**
 * __useDestroyAccountMutation__
 *
 * To run a mutation, you first call `useDestroyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyAccountMutation, { data, loading, error }] = useDestroyAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDestroyAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<DestroyAccountMutation, DestroyAccountMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DestroyAccountMutation, DestroyAccountMutationVariables>(
    DestroyAccountDocument,
    options,
  );
}
export type DestroyAccountMutationHookResult = ReturnType<typeof useDestroyAccountMutation>;
export type DestroyAccountMutationResult = Apollo.MutationResult<DestroyAccountMutation>;
export type DestroyAccountMutationOptions = Apollo.BaseMutationOptions<
  DestroyAccountMutation,
  DestroyAccountMutationVariables
>;
