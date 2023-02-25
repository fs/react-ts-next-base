import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DestroyAdminMutationVariables = Types.Exact<{
  input: Types.DestroyAdminInput;
}>;

export type DestroyAdminMutation = {
  __typename?: 'Mutation';
  destroyAdmin?: { __typename?: 'Message'; message: string } | null;
};

export const DestroyAdminDocument = gql`
  mutation DestroyAdmin($input: DestroyAdminInput!) {
    destroyAdmin(input: $input) {
      message
    }
  }
`;
export type DestroyAdminMutationFn = Apollo.MutationFunction<
  DestroyAdminMutation,
  DestroyAdminMutationVariables
>;

/**
 * __useDestroyAdminMutation__
 *
 * To run a mutation, you first call `useDestroyAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyAdminMutation, { data, loading, error }] = useDestroyAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDestroyAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<DestroyAdminMutation, DestroyAdminMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DestroyAdminMutation, DestroyAdminMutationVariables>(
    DestroyAdminDocument,
    options,
  );
}
export type DestroyAdminMutationHookResult = ReturnType<typeof useDestroyAdminMutation>;
export type DestroyAdminMutationResult = Apollo.MutationResult<DestroyAdminMutation>;
export type DestroyAdminMutationOptions = Apollo.BaseMutationOptions<
  DestroyAdminMutation,
  DestroyAdminMutationVariables
>;
