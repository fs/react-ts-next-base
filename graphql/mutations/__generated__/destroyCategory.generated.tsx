import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DestroyCategoryMutationVariables = Types.Exact<{
  input: Types.DestroyCategoryInput;
}>;

export type DestroyCategoryMutation = {
  __typename?: 'Mutation';
  destroyCategory?: {
    __typename?: 'DestroyCategoryPayload';
    message: string;
    category: { __typename?: 'Category'; name: string };
  } | null;
};

export const DestroyCategoryDocument = gql`
  mutation destroyCategory($input: DestroyCategoryInput!) {
    destroyCategory(input: $input) {
      message
      category {
        name
      }
    }
  }
`;
export type DestroyCategoryMutationFn = Apollo.MutationFunction<
  DestroyCategoryMutation,
  DestroyCategoryMutationVariables
>;

/**
 * __useDestroyCategoryMutation__
 *
 * To run a mutation, you first call `useDestroyCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyCategoryMutation, { data, loading, error }] = useDestroyCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDestroyCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DestroyCategoryMutation,
    DestroyCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DestroyCategoryMutation, DestroyCategoryMutationVariables>(
    DestroyCategoryDocument,
    options,
  );
}
export type DestroyCategoryMutationHookResult = ReturnType<typeof useDestroyCategoryMutation>;
export type DestroyCategoryMutationResult = Apollo.MutationResult<DestroyCategoryMutation>;
export type DestroyCategoryMutationOptions = Apollo.BaseMutationOptions<
  DestroyCategoryMutation,
  DestroyCategoryMutationVariables
>;
