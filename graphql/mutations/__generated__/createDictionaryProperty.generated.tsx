import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateDictionaryPropertyMutationVariables = Types.Exact<{
  input: Types.CreateDictionaryPropertyInput;
}>;

export type CreateDictionaryPropertyMutation = {
  __typename?: 'Mutation';
  createDictionaryProperty?: { __typename?: 'DictionaryProperty'; name: string } | null;
};

export const CreateDictionaryPropertyDocument = gql`
  mutation CreateDictionaryProperty($input: CreateDictionaryPropertyInput!) {
    createDictionaryProperty(input: $input) {
      name
    }
  }
`;
export type CreateDictionaryPropertyMutationFn = Apollo.MutationFunction<
  CreateDictionaryPropertyMutation,
  CreateDictionaryPropertyMutationVariables
>;

/**
 * __useCreateDictionaryPropertyMutation__
 *
 * To run a mutation, you first call `useCreateDictionaryPropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDictionaryPropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDictionaryPropertyMutation, { data, loading, error }] = useCreateDictionaryPropertyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDictionaryPropertyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDictionaryPropertyMutation,
    CreateDictionaryPropertyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDictionaryPropertyMutation,
    CreateDictionaryPropertyMutationVariables
  >(CreateDictionaryPropertyDocument, options);
}
export type CreateDictionaryPropertyMutationHookResult = ReturnType<
  typeof useCreateDictionaryPropertyMutation
>;
export type CreateDictionaryPropertyMutationResult =
  Apollo.MutationResult<CreateDictionaryPropertyMutation>;
export type CreateDictionaryPropertyMutationOptions = Apollo.BaseMutationOptions<
  CreateDictionaryPropertyMutation,
  CreateDictionaryPropertyMutationVariables
>;
