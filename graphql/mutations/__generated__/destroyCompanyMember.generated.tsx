import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DestroyCompanyMemberMutationVariables = Types.Exact<{
  input: Types.DestroyCompanyMemberInput;
}>;

export type DestroyCompanyMemberMutation = {
  __typename?: 'Mutation';
  destroyCompanyMember?: { __typename?: 'User'; id: string; email: string } | null;
};

export const DestroyCompanyMemberDocument = gql`
  mutation DestroyCompanyMember($input: DestroyCompanyMemberInput!) {
    destroyCompanyMember(input: $input) {
      id
      email
    }
  }
`;
export type DestroyCompanyMemberMutationFn = Apollo.MutationFunction<
  DestroyCompanyMemberMutation,
  DestroyCompanyMemberMutationVariables
>;

/**
 * __useDestroyCompanyMemberMutation__
 *
 * To run a mutation, you first call `useDestroyCompanyMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyCompanyMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyCompanyMemberMutation, { data, loading, error }] = useDestroyCompanyMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDestroyCompanyMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DestroyCompanyMemberMutation,
    DestroyCompanyMemberMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DestroyCompanyMemberMutation, DestroyCompanyMemberMutationVariables>(
    DestroyCompanyMemberDocument,
    options,
  );
}
export type DestroyCompanyMemberMutationHookResult = ReturnType<
  typeof useDestroyCompanyMemberMutation
>;
export type DestroyCompanyMemberMutationResult =
  Apollo.MutationResult<DestroyCompanyMemberMutation>;
export type DestroyCompanyMemberMutationOptions = Apollo.BaseMutationOptions<
  DestroyCompanyMemberMutation,
  DestroyCompanyMemberMutationVariables
>;
