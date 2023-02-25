import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCompanyMemberMutationVariables = Types.Exact<{
  input: Types.UpdateCompanyMemberInput;
}>;

export type UpdateCompanyMemberMutation = {
  __typename?: 'Mutation';
  updateCompanyMember?: { __typename?: 'User'; id: string } | null;
};

export const UpdateCompanyMemberDocument = gql`
  mutation UpdateCompanyMember($input: UpdateCompanyMemberInput!) {
    updateCompanyMember(input: $input) {
      id
    }
  }
`;
export type UpdateCompanyMemberMutationFn = Apollo.MutationFunction<
  UpdateCompanyMemberMutation,
  UpdateCompanyMemberMutationVariables
>;

/**
 * __useUpdateCompanyMemberMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyMemberMutation, { data, loading, error }] = useUpdateCompanyMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCompanyMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCompanyMemberMutation,
    UpdateCompanyMemberMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCompanyMemberMutation, UpdateCompanyMemberMutationVariables>(
    UpdateCompanyMemberDocument,
    options,
  );
}
export type UpdateCompanyMemberMutationHookResult = ReturnType<
  typeof useUpdateCompanyMemberMutation
>;
export type UpdateCompanyMemberMutationResult = Apollo.MutationResult<UpdateCompanyMemberMutation>;
export type UpdateCompanyMemberMutationOptions = Apollo.BaseMutationOptions<
  UpdateCompanyMemberMutation,
  UpdateCompanyMemberMutationVariables
>;
