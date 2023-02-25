import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OpenDisputeMutationVariables = Types.Exact<{
  input: Types.OpenDisputeInput;
}>;

export type OpenDisputeMutation = {
  __typename?: 'Mutation';
  openDispute?: { __typename?: 'Dispute'; id: string } | null;
};

export const OpenDisputeDocument = gql`
  mutation OpenDispute($input: OpenDisputeInput!) {
    openDispute(input: $input) {
      id
    }
  }
`;
export type OpenDisputeMutationFn = Apollo.MutationFunction<
  OpenDisputeMutation,
  OpenDisputeMutationVariables
>;

/**
 * __useOpenDisputeMutation__
 *
 * To run a mutation, you first call `useOpenDisputeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenDisputeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openDisputeMutation, { data, loading, error }] = useOpenDisputeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOpenDisputeMutation(
  baseOptions?: Apollo.MutationHookOptions<OpenDisputeMutation, OpenDisputeMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<OpenDisputeMutation, OpenDisputeMutationVariables>(
    OpenDisputeDocument,
    options,
  );
}
export type OpenDisputeMutationHookResult = ReturnType<typeof useOpenDisputeMutation>;
export type OpenDisputeMutationResult = Apollo.MutationResult<OpenDisputeMutation>;
export type OpenDisputeMutationOptions = Apollo.BaseMutationOptions<
  OpenDisputeMutation,
  OpenDisputeMutationVariables
>;
