import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateStringPropertyMutationVariables = Types.Exact<{
  input: Types.UpdatePropertyInput;
}>;

export type UpdateStringPropertyMutation = {
  __typename?: 'Mutation';
  updateStringProperty?: { __typename?: 'StringProperty'; name: string } | null;
};

export const UpdateStringPropertyDocument = gql`
  mutation UpdateStringProperty($input: UpdatePropertyInput!) {
    updateStringProperty(input: $input) {
      name
    }
  }
`;
export type UpdateStringPropertyMutationFn = Apollo.MutationFunction<
  UpdateStringPropertyMutation,
  UpdateStringPropertyMutationVariables
>;

/**
 * __useUpdateStringPropertyMutation__
 *
 * To run a mutation, you first call `useUpdateStringPropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStringPropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStringPropertyMutation, { data, loading, error }] = useUpdateStringPropertyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStringPropertyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateStringPropertyMutation,
    UpdateStringPropertyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateStringPropertyMutation, UpdateStringPropertyMutationVariables>(
    UpdateStringPropertyDocument,
    options,
  );
}
export type UpdateStringPropertyMutationHookResult = ReturnType<
  typeof useUpdateStringPropertyMutation
>;
export type UpdateStringPropertyMutationResult =
  Apollo.MutationResult<UpdateStringPropertyMutation>;
export type UpdateStringPropertyMutationOptions = Apollo.BaseMutationOptions<
  UpdateStringPropertyMutation,
  UpdateStringPropertyMutationVariables
>;
