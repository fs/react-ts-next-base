import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RestoreProductMutationVariables = Types.Exact<{
  input: Types.RestoreProductInput;
}>;

export type RestoreProductMutation = {
  __typename?: 'Mutation';
  restoreProduct?: { __typename?: 'Product'; id: string; name?: string | null } | null;
};

export const RestoreProductDocument = gql`
  mutation RestoreProduct($input: RestoreProductInput!) {
    restoreProduct(input: $input) {
      id
      name
    }
  }
`;
export type RestoreProductMutationFn = Apollo.MutationFunction<
  RestoreProductMutation,
  RestoreProductMutationVariables
>;

/**
 * __useRestoreProductMutation__
 *
 * To run a mutation, you first call `useRestoreProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreProductMutation, { data, loading, error }] = useRestoreProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRestoreProductMutation(
  baseOptions?: Apollo.MutationHookOptions<RestoreProductMutation, RestoreProductMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RestoreProductMutation, RestoreProductMutationVariables>(
    RestoreProductDocument,
    options,
  );
}
export type RestoreProductMutationHookResult = ReturnType<typeof useRestoreProductMutation>;
export type RestoreProductMutationResult = Apollo.MutationResult<RestoreProductMutation>;
export type RestoreProductMutationOptions = Apollo.BaseMutationOptions<
  RestoreProductMutation,
  RestoreProductMutationVariables
>;
