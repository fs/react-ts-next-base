import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CategoryInfoFragmentDoc } from '../../fragments/__generated__/categoryInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCategoryMutationVariables = Types.Exact<{
  input: Types.UpdateCategoryInput;
}>;

export type UpdateCategoryMutation = {
  __typename?: 'Mutation';
  updateCategory?: {
    __typename?: 'Category';
    depth: number;
    id: string;
    name: string;
    position: number;
    canDestroy: { __typename?: 'AuthorizationResult'; value: boolean; message?: string | null };
  } | null;
};

export const UpdateCategoryDocument = gql`
  mutation updateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
      ...CategoryInfo
    }
  }
  ${CategoryInfoFragmentDoc}
`;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(
    UpdateCategoryDocument,
    options,
  );
}
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;
