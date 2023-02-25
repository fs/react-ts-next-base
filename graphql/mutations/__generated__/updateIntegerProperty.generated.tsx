import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateIntegerPropertyMutationVariables = Types.Exact<{
  input: Types.UpdatePropertyInput;
}>;

export type UpdateIntegerPropertyMutation = {
  __typename?: 'Mutation';
  updateIntegerProperty?: { __typename?: 'IntegerProperty'; name: string } | null;
};

export const UpdateIntegerPropertyDocument = gql`
  mutation UpdateIntegerProperty($input: UpdatePropertyInput!) {
    updateIntegerProperty(input: $input) {
      name
    }
  }
`;
export type UpdateIntegerPropertyMutationFn = Apollo.MutationFunction<
  UpdateIntegerPropertyMutation,
  UpdateIntegerPropertyMutationVariables
>;

/**
 * __useUpdateIntegerPropertyMutation__
 *
 * To run a mutation, you first call `useUpdateIntegerPropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIntegerPropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIntegerPropertyMutation, { data, loading, error }] = useUpdateIntegerPropertyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIntegerPropertyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateIntegerPropertyMutation,
    UpdateIntegerPropertyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateIntegerPropertyMutation, UpdateIntegerPropertyMutationVariables>(
    UpdateIntegerPropertyDocument,
    options,
  );
}
export type UpdateIntegerPropertyMutationHookResult = ReturnType<
  typeof useUpdateIntegerPropertyMutation
>;
export type UpdateIntegerPropertyMutationResult =
  Apollo.MutationResult<UpdateIntegerPropertyMutation>;
export type UpdateIntegerPropertyMutationOptions = Apollo.BaseMutationOptions<
  UpdateIntegerPropertyMutation,
  UpdateIntegerPropertyMutationVariables
>;
