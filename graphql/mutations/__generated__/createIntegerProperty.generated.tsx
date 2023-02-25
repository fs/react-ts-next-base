import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateIntegerPropertyMutationVariables = Types.Exact<{
  input: Types.CreateIntegerPropertyInput;
}>;

export type CreateIntegerPropertyMutation = {
  __typename?: 'Mutation';
  createIntegerProperty?: { __typename?: 'IntegerProperty'; name: string } | null;
};

export const CreateIntegerPropertyDocument = gql`
  mutation CreateIntegerProperty($input: CreateIntegerPropertyInput!) {
    createIntegerProperty(input: $input) {
      name
    }
  }
`;
export type CreateIntegerPropertyMutationFn = Apollo.MutationFunction<
  CreateIntegerPropertyMutation,
  CreateIntegerPropertyMutationVariables
>;

/**
 * __useCreateIntegerPropertyMutation__
 *
 * To run a mutation, you first call `useCreateIntegerPropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIntegerPropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIntegerPropertyMutation, { data, loading, error }] = useCreateIntegerPropertyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateIntegerPropertyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateIntegerPropertyMutation,
    CreateIntegerPropertyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateIntegerPropertyMutation, CreateIntegerPropertyMutationVariables>(
    CreateIntegerPropertyDocument,
    options,
  );
}
export type CreateIntegerPropertyMutationHookResult = ReturnType<
  typeof useCreateIntegerPropertyMutation
>;
export type CreateIntegerPropertyMutationResult =
  Apollo.MutationResult<CreateIntegerPropertyMutation>;
export type CreateIntegerPropertyMutationOptions = Apollo.BaseMutationOptions<
  CreateIntegerPropertyMutation,
  CreateIntegerPropertyMutationVariables
>;
