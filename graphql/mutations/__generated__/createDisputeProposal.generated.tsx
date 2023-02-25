import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateDisputeProposalMutationVariables = Types.Exact<{
  input: Types.NewDisputeProposalInput;
}>;

export type CreateDisputeProposalMutation = {
  __typename?: 'Mutation';
  createDisputeProposal?: { __typename?: 'DisputeProposal'; id: string } | null;
};

export const CreateDisputeProposalDocument = gql`
  mutation CreateDisputeProposal($input: NewDisputeProposalInput!) {
    createDisputeProposal(input: $input) {
      id
    }
  }
`;
export type CreateDisputeProposalMutationFn = Apollo.MutationFunction<
  CreateDisputeProposalMutation,
  CreateDisputeProposalMutationVariables
>;

/**
 * __useCreateDisputeProposalMutation__
 *
 * To run a mutation, you first call `useCreateDisputeProposalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDisputeProposalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDisputeProposalMutation, { data, loading, error }] = useCreateDisputeProposalMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDisputeProposalMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDisputeProposalMutation,
    CreateDisputeProposalMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateDisputeProposalMutation, CreateDisputeProposalMutationVariables>(
    CreateDisputeProposalDocument,
    options,
  );
}
export type CreateDisputeProposalMutationHookResult = ReturnType<
  typeof useCreateDisputeProposalMutation
>;
export type CreateDisputeProposalMutationResult =
  Apollo.MutationResult<CreateDisputeProposalMutation>;
export type CreateDisputeProposalMutationOptions = Apollo.BaseMutationOptions<
  CreateDisputeProposalMutation,
  CreateDisputeProposalMutationVariables
>;
