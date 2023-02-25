import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DestroyProductMutationVariables = Types.Exact<{
  input: Types.DestroyProductInput;
}>;

export type DestroyProductMutation = {
  __typename?: 'Mutation';
  destroyProduct?: { __typename?: 'Message'; message: string } | null;
};

export const DestroyProductDocument = gql`
  mutation DestroyProduct($input: DestroyProductInput!) {
    destroyProduct(input: $input) {
      message
    }
  }
`;
export type DestroyProductMutationFn = Apollo.MutationFunction<
  DestroyProductMutation,
  DestroyProductMutationVariables
>;

/**
 * __useDestroyProductMutation__
 *
 * To run a mutation, you first call `useDestroyProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyProductMutation, { data, loading, error }] = useDestroyProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDestroyProductMutation(
  baseOptions?: Apollo.MutationHookOptions<DestroyProductMutation, DestroyProductMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DestroyProductMutation, DestroyProductMutationVariables>(
    DestroyProductDocument,
    options,
  );
}
export type DestroyProductMutationHookResult = ReturnType<typeof useDestroyProductMutation>;
export type DestroyProductMutationResult = Apollo.MutationResult<DestroyProductMutation>;
export type DestroyProductMutationOptions = Apollo.BaseMutationOptions<
  DestroyProductMutation,
  DestroyProductMutationVariables
>;
