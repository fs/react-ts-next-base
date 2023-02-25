import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResolveDisputeMutationVariables = Types.Exact<{
  input: Types.ResolveDisputeInput;
}>;

export type ResolveDisputeMutation = {
  __typename?: 'Mutation';
  resolveDispute?: { __typename?: 'DisputeProposal'; id: string } | null;
};

export const ResolveDisputeDocument = gql`
  mutation ResolveDispute($input: ResolveDisputeInput!) {
    resolveDispute(input: $input) {
      id
    }
  }
`;
export type ResolveDisputeMutationFn = Apollo.MutationFunction<
  ResolveDisputeMutation,
  ResolveDisputeMutationVariables
>;

/**
 * __useResolveDisputeMutation__
 *
 * To run a mutation, you first call `useResolveDisputeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResolveDisputeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resolveDisputeMutation, { data, loading, error }] = useResolveDisputeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResolveDisputeMutation(
  baseOptions?: Apollo.MutationHookOptions<ResolveDisputeMutation, ResolveDisputeMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ResolveDisputeMutation, ResolveDisputeMutationVariables>(
    ResolveDisputeDocument,
    options,
  );
}
export type ResolveDisputeMutationHookResult = ReturnType<typeof useResolveDisputeMutation>;
export type ResolveDisputeMutationResult = Apollo.MutationResult<ResolveDisputeMutation>;
export type ResolveDisputeMutationOptions = Apollo.BaseMutationOptions<
  ResolveDisputeMutation,
  ResolveDisputeMutationVariables
>;
