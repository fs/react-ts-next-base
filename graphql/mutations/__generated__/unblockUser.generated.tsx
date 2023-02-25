import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnblockUserMutationVariables = Types.Exact<{
  input: Types.UnblockUserInput;
}>;

export type UnblockUserMutation = {
  __typename?: 'Mutation';
  unblockUser?: { __typename?: 'User'; id: string; fullName?: string | null } | null;
};

export const UnblockUserDocument = gql`
  mutation UnblockUser($input: UnblockUserInput!) {
    unblockUser(input: $input) {
      id
      fullName
    }
  }
`;
export type UnblockUserMutationFn = Apollo.MutationFunction<
  UnblockUserMutation,
  UnblockUserMutationVariables
>;

/**
 * __useUnblockUserMutation__
 *
 * To run a mutation, you first call `useUnblockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblockUserMutation, { data, loading, error }] = useUnblockUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnblockUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UnblockUserMutation, UnblockUserMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UnblockUserMutation, UnblockUserMutationVariables>(
    UnblockUserDocument,
    options,
  );
}
export type UnblockUserMutationHookResult = ReturnType<typeof useUnblockUserMutation>;
export type UnblockUserMutationResult = Apollo.MutationResult<UnblockUserMutation>;
export type UnblockUserMutationOptions = Apollo.BaseMutationOptions<
  UnblockUserMutation,
  UnblockUserMutationVariables
>;
