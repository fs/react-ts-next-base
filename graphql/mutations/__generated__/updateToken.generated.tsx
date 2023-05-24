import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CurrentUserFragmentDoc } from '../../fragments/__generated__/currentUserInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTokenMutationVariables = Types.Exact<{ [key: string]: never }>;

export type UpdateTokenMutation = {
  __typename?: 'Mutation';
  updateToken?: {
    __typename?: 'UpdateTokenPayload';
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

export const UpdateTokenDocument = gql`
  mutation updateToken {
    updateToken {
      me {
        ...CurrentUser
      }
      accessToken
      refreshToken
    }
  }
  ${CurrentUserFragmentDoc}
`;
export type UpdateTokenMutationFn = Apollo.MutationFunction<
  UpdateTokenMutation,
  UpdateTokenMutationVariables
>;

/**
 * __useUpdateTokenMutation__
 *
 * To run a mutation, you first call `useUpdateTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTokenMutation, { data, loading, error }] = useUpdateTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateTokenMutation, UpdateTokenMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTokenMutation, UpdateTokenMutationVariables>(
    UpdateTokenDocument,
    options,
  );
}
export type UpdateTokenMutationHookResult = ReturnType<typeof useUpdateTokenMutation>;
export type UpdateTokenMutationResult = Apollo.MutationResult<UpdateTokenMutation>;
export type UpdateTokenMutationOptions = Apollo.BaseMutationOptions<
  UpdateTokenMutation,
  UpdateTokenMutationVariables
>;
