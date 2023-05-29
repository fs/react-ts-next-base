import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CurrentUserFragmentDoc } from '../../fragments/__generated__/currentUserInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SignInMutationVariables = Types.Exact<{
  input: Types.SignInInput;
}>;

export type SignInMutation = {
  __typename?: 'Mutation';
  signIn?: {
    __typename?: 'SignInPayload';
    accessToken: string;
    refreshToken: string;
    me?: {
      __typename?: 'CurrentUser';
      id: string;
      avatarUrl?: string | null;
      email: string;
      firstName?: string | null;
      lastName?: string | null;
    } | null;
  } | null;
};

export const SignInDocument = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      me {
        ...CurrentUser
      }
      accessToken
      refreshToken
    }
  }
  ${CurrentUserFragmentDoc}
`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
