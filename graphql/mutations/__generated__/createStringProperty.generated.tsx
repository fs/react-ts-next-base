import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateStringPropertyMutationVariables = Types.Exact<{
  input: Types.CreateStringPropertyInput;
}>;

export type CreateStringPropertyMutation = {
  __typename?: 'Mutation';
  createStringProperty?: { __typename?: 'StringProperty'; name: string } | null;
};

export const CreateStringPropertyDocument = gql`
  mutation CreateStringProperty($input: CreateStringPropertyInput!) {
    createStringProperty(input: $input) {
      name
    }
  }
`;
export type CreateStringPropertyMutationFn = Apollo.MutationFunction<
  CreateStringPropertyMutation,
  CreateStringPropertyMutationVariables
>;

/**
 * __useCreateStringPropertyMutation__
 *
 * To run a mutation, you first call `useCreateStringPropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStringPropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStringPropertyMutation, { data, loading, error }] = useCreateStringPropertyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStringPropertyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateStringPropertyMutation,
    CreateStringPropertyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateStringPropertyMutation, CreateStringPropertyMutationVariables>(
    CreateStringPropertyDocument,
    options,
  );
}
export type CreateStringPropertyMutationHookResult = ReturnType<
  typeof useCreateStringPropertyMutation
>;
export type CreateStringPropertyMutationResult =
  Apollo.MutationResult<CreateStringPropertyMutation>;
export type CreateStringPropertyMutationOptions = Apollo.BaseMutationOptions<
  CreateStringPropertyMutation,
  CreateStringPropertyMutationVariables
>;
