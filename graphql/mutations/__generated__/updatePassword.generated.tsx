import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CurrentUserFragmentDoc } from '../../fragments/__generated__/currentUserInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdatePasswordMutationVariables = Types.Exact<{
  input: Types.UpdatePasswordInput;
}>;

export type UpdatePasswordMutation = {
  __typename?: 'Mutation';
  updatePassword?: {
    __typename?: 'UpdatePasswordPayload';
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

export const UpdatePasswordDocument = gql`
  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      me {
        ...CurrentUser
      }
      accessToken
      refreshToken
    }
  }
  ${CurrentUserFragmentDoc}
`;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(
    UpdatePasswordDocument,
    options,
  );
}
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>;
