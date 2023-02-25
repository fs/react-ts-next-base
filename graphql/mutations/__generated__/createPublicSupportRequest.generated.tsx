import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreatePublicSupportRequestMutationVariables = Types.Exact<{
  input: Types.PublicSupportRequestInput;
}>;

export type CreatePublicSupportRequestMutation = {
  __typename?: 'Mutation';
  createPublicSupportRequest?: {
    __typename?: 'SupportRequest';
    email?: string | null;
    id: string;
    message: string;
    subject: string;
    images?: Array<{ __typename?: 'SupportRequestPhoto'; id: string; imageUrl: string }> | null;
    user?: { __typename?: 'User'; id: string; email: string } | null;
  } | null;
};

export const CreatePublicSupportRequestDocument = gql`
  mutation createPublicSupportRequest($input: PublicSupportRequestInput!) {
    createPublicSupportRequest(input: $input) {
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
export type CreatePublicSupportRequestMutationFn = Apollo.MutationFunction<
  CreatePublicSupportRequestMutation,
  CreatePublicSupportRequestMutationVariables
>;

/**
 * __useCreatePublicSupportRequestMutation__
 *
 * To run a mutation, you first call `useCreatePublicSupportRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePublicSupportRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPublicSupportRequestMutation, { data, loading, error }] = useCreatePublicSupportRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePublicSupportRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePublicSupportRequestMutation,
    CreatePublicSupportRequestMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreatePublicSupportRequestMutation,
    CreatePublicSupportRequestMutationVariables
  >(CreatePublicSupportRequestDocument, options);
}
export type CreatePublicSupportRequestMutationHookResult = ReturnType<
  typeof useCreatePublicSupportRequestMutation
>;
export type CreatePublicSupportRequestMutationResult =
  Apollo.MutationResult<CreatePublicSupportRequestMutation>;
export type CreatePublicSupportRequestMutationOptions = Apollo.BaseMutationOptions<
  CreatePublicSupportRequestMutation,
  CreatePublicSupportRequestMutationVariables
>;
