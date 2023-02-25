import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CancelDisputeMutationVariables = Types.Exact<{
  input: Types.CancelDisputeInput;
}>;

export type CancelDisputeMutation = {
  __typename?: 'Mutation';
  cancelDispute?: { __typename?: 'Dispute'; id: string } | null;
};

export const CancelDisputeDocument = gql`
  mutation CancelDispute($input: CancelDisputeInput!) {
    cancelDispute(input: $input) {
      id
    }
  }
`;
export type CancelDisputeMutationFn = Apollo.MutationFunction<
  CancelDisputeMutation,
  CancelDisputeMutationVariables
>;

/**
 * __useCancelDisputeMutation__
 *
 * To run a mutation, you first call `useCancelDisputeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelDisputeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelDisputeMutation, { data, loading, error }] = useCancelDisputeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelDisputeMutation(
  baseOptions?: Apollo.MutationHookOptions<CancelDisputeMutation, CancelDisputeMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CancelDisputeMutation, CancelDisputeMutationVariables>(
    CancelDisputeDocument,
    options,
  );
}
export type CancelDisputeMutationHookResult = ReturnType<typeof useCancelDisputeMutation>;
export type CancelDisputeMutationResult = Apollo.MutationResult<CancelDisputeMutation>;
export type CancelDisputeMutationOptions = Apollo.BaseMutationOptions<
  CancelDisputeMutation,
  CancelDisputeMutationVariables
>;
