import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateSupportRequestMutationVariables = Types.Exact<{
  input: Types.SupportRequestInput;
}>;

export type CreateSupportRequestMutation = {
  __typename?: 'Mutation';
  createSupportRequest?: {
    __typename?: 'SupportRequest';
    email?: string | null;
    id: string;
    message: string;
    subject: string;
    images?: Array<{ __typename?: 'SupportRequestPhoto'; id: string; imageUrl: string }> | null;
    user?: { __typename?: 'User'; id: string; email: string } | null;
  } | null;
};

export const CreateSupportRequestDocument = gql`
  mutation createSupportRequest($input: SupportRequestInput!) {
    createSupportRequest(input: $input) {
      email
      id
      images {
        id
        imageUrl
      }
      message
      subject
      user {
        id
        email
      }
    }
  }
`;
export type CreateSupportRequestMutationFn = Apollo.MutationFunction<
  CreateSupportRequestMutation,
  CreateSupportRequestMutationVariables
>;

/**
 * __useCreateSupportRequestMutation__
 *
 * To run a mutation, you first call `useCreateSupportRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSupportRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSupportRequestMutation, { data, loading, error }] = useCreateSupportRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSupportRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSupportRequestMutation,
    CreateSupportRequestMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateSupportRequestMutation, CreateSupportRequestMutationVariables>(
    CreateSupportRequestDocument,
    options,
  );
}
export type CreateSupportRequestMutationHookResult = ReturnType<
  typeof useCreateSupportRequestMutation
>;
export type CreateSupportRequestMutationResult =
  Apollo.MutationResult<CreateSupportRequestMutation>;
export type CreateSupportRequestMutationOptions = Apollo.BaseMutationOptions<
  CreateSupportRequestMutation,
  CreateSupportRequestMutationVariables
>;
