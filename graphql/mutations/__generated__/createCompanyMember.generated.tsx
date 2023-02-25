import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCompanyMemberMutationVariables = Types.Exact<{
  input: Types.CompanyMemberInput;
}>;

export type CreateCompanyMemberMutation = {
  __typename?: 'Mutation';
  createCompanyMember?: {
    __typename?: 'User';
    lastName?: string | null;
    id: string;
    firstName?: string | null;
    email: string;
    avatarUrl?: string | null;
  } | null;
};

export const CreateCompanyMemberDocument = gql`
  mutation CreateCompanyMember($input: CompanyMemberInput!) {
    createCompanyMember(input: $input) {
      lastName
      id
      firstName
      email
      avatarUrl
    }
  }
`;
export type CreateCompanyMemberMutationFn = Apollo.MutationFunction<
  CreateCompanyMemberMutation,
  CreateCompanyMemberMutationVariables
>;

/**
 * __useCreateCompanyMemberMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMemberMutation, { data, loading, error }] = useCreateCompanyMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompanyMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCompanyMemberMutation,
    CreateCompanyMemberMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCompanyMemberMutation, CreateCompanyMemberMutationVariables>(
    CreateCompanyMemberDocument,
    options,
  );
}
export type CreateCompanyMemberMutationHookResult = ReturnType<
  typeof useCreateCompanyMemberMutation
>;
export type CreateCompanyMemberMutationResult = Apollo.MutationResult<CreateCompanyMemberMutation>;
export type CreateCompanyMemberMutationOptions = Apollo.BaseMutationOptions<
  CreateCompanyMemberMutation,
  CreateCompanyMemberMutationVariables
>;
