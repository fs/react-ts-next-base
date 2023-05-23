import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CurrentUserFragmentDoc } from '../../fragments/__generated__/currentUserInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SignUpMutationVariables = Types.Exact<{
  input: Types.SignUpInput;
}>;

export type SignUpMutation = {
  __typename?: 'Mutation';
  signUp?: {
    __typename?: 'SignUpPayload';
    accessToken: string;
    refreshToken: string;
    me?: {
      __typename?: 'CurrentUser';
      avatarUrl?: string | null;
      id: string;
      email: string;
      firstName?: string | null;
      lastName?: string | null;
    } | null;
  } | null;
};

export const SignUpDocument = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      me {
        ...CurrentUser
      }
      accessToken
      refreshToken
    }
  }
  ${CurrentUserFragmentDoc}
`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
