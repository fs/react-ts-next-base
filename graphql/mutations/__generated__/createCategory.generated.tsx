import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CategoryInfoFragmentDoc } from '../../fragments/__generated__/categoryInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCategoryMutationVariables = Types.Exact<{
  input: Types.CreateCategoryInput;
}>;

export type CreateCategoryMutation = {
  __typename?: 'Mutation';
  createCategory?: {
    __typename?: 'Category';
    depth: number;
    id: string;
    name: string;
    position: number;
    canDestroy: { __typename?: 'AuthorizationResult'; value: boolean; message?: string | null };
  } | null;
};

export const CreateCategoryDocument = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      ...CategoryInfo
    }
  }
  ${CategoryInfoFragmentDoc}
`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(
    CreateCategoryDocument,
    options,
  );
}
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;
