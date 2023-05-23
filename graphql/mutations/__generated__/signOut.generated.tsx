import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SignOutMutationVariables = Types.Exact<{
  input: Types.SignOutInput;
}>;

export type SignOutMutation = {
  __typename?: 'Mutation';
  signOut?: { __typename?: 'SignOutPayload'; message: string } | null;
};

export const SignOutDocument = gql`
  mutation signOut($input: SignOutInput!) {
    signOut(input: $input) {
      message
    }
  }
`;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignOutMutation(
  baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<
  SignOutMutation,
  SignOutMutationVariables
>;
