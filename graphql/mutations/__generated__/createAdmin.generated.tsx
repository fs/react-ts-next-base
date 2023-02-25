import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateAdminMutationVariables = Types.Exact<{
  input: Types.CreateAdminInput;
}>;

export type CreateAdminMutation = {
  __typename?: 'Mutation';
  createAdmin?: {
    __typename?: 'User';
    avatarUrl?: string | null;
    email: string;
    firstName?: string | null;
    id: string;
    lastName?: string | null;
    middleName?: string | null;
    phoneNumber?: string | null;
    systemRole?: Types.SystemRoleEnum | null;
    companyMembers: Array<{ __typename?: 'CompanyMember'; id: string }>;
  } | null;
};

export const CreateAdminDocument = gql`
  mutation CreateAdmin($input: CreateAdminInput!) {
    createAdmin(input: $input) {
      avatarUrl
      companyMembers {
        id
      }
      email
      firstName
      id
      lastName
      middleName
      phoneNumber
      systemRole
    }
  }
`;
export type CreateAdminMutationFn = Apollo.MutationFunction<
  CreateAdminMutation,
  CreateAdminMutationVariables
>;

/**
 * __useCreateAdminMutation__
 *
 * To run a mutation, you first call `useCreateAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdminMutation, { data, loading, error }] = useCreateAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAdminMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateAdminMutation, CreateAdminMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAdminMutation, CreateAdminMutationVariables>(
    CreateAdminDocument,
    options,
  );
}
export type CreateAdminMutationHookResult = ReturnType<typeof useCreateAdminMutation>;
export type CreateAdminMutationResult = Apollo.MutationResult<CreateAdminMutation>;
export type CreateAdminMutationOptions = Apollo.BaseMutationOptions<
  CreateAdminMutation,
  CreateAdminMutationVariables
>;
