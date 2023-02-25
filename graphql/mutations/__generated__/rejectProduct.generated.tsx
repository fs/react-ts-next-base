import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RejectProductMutationVariables = Types.Exact<{
  input: Types.RejectProductInput;
}>;

export type RejectProductMutation = {
  __typename?: 'Mutation';
  rejectProduct?: { __typename?: 'Product'; id: string } | null;
};

export const RejectProductDocument = gql`
  mutation rejectProduct($input: RejectProductInput!) {
    rejectProduct(input: $input) {
      id
    }
  }
`;
export type RejectProductMutationFn = Apollo.MutationFunction<
  RejectProductMutation,
  RejectProductMutationVariables
>;

/**
 * __useRejectProductMutation__
 *
 * To run a mutation, you first call `useRejectProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectProductMutation, { data, loading, error }] = useRejectProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRejectProductMutation(
  baseOptions?: Apollo.MutationHookOptions<RejectProductMutation, RejectProductMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RejectProductMutation, RejectProductMutationVariables>(
    RejectProductDocument,
    options,
  );
}
export type RejectProductMutationHookResult = ReturnType<typeof useRejectProductMutation>;
export type RejectProductMutationResult = Apollo.MutationResult<RejectProductMutation>;
export type RejectProductMutationOptions = Apollo.BaseMutationOptions<
  RejectProductMutation,
  RejectProductMutationVariables
>;
