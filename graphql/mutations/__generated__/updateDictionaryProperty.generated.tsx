import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateDictionaryPropertyMutationVariables = Types.Exact<{
  input: Types.UpdateDictionaryPropertyInput;
}>;

export type UpdateDictionaryPropertyMutation = {
  __typename?: 'Mutation';
  updateDictionaryProperty?: { __typename?: 'DictionaryProperty'; name: string } | null;
};

export const UpdateDictionaryPropertyDocument = gql`
  mutation UpdateDictionaryProperty($input: UpdateDictionaryPropertyInput!) {
    updateDictionaryProperty(input: $input) {
      name
    }
  }
`;
export type UpdateDictionaryPropertyMutationFn = Apollo.MutationFunction<
  UpdateDictionaryPropertyMutation,
  UpdateDictionaryPropertyMutationVariables
>;

/**
 * __useUpdateDictionaryPropertyMutation__
 *
 * To run a mutation, you first call `useUpdateDictionaryPropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDictionaryPropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDictionaryPropertyMutation, { data, loading, error }] = useUpdateDictionaryPropertyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDictionaryPropertyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateDictionaryPropertyMutation,
    UpdateDictionaryPropertyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateDictionaryPropertyMutation,
    UpdateDictionaryPropertyMutationVariables
  >(UpdateDictionaryPropertyDocument, options);
}
export type UpdateDictionaryPropertyMutationHookResult = ReturnType<
  typeof useUpdateDictionaryPropertyMutation
>;
export type UpdateDictionaryPropertyMutationResult =
  Apollo.MutationResult<UpdateDictionaryPropertyMutation>;
export type UpdateDictionaryPropertyMutationOptions = Apollo.BaseMutationOptions<
  UpdateDictionaryPropertyMutation,
  UpdateDictionaryPropertyMutationVariables
>;
