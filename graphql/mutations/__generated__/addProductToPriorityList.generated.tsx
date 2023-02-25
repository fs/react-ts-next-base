import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddProductToPriorityListMutationVariables = Types.Exact<{
  input: Types.AddProductToPriorityListInput;
}>;

export type AddProductToPriorityListMutation = {
  __typename?: 'Mutation';
  addProductToPriorityList?: {
    __typename?: 'AddProductToPriorityListPayload';
    product: {
      __typename?: 'Product';
      id: string;
      canAddToPriorityList: boolean;
      canRemoveFromPriorityList: boolean;
      prioritized: boolean;
    };
  } | null;
};

export const AddProductToPriorityListDocument = gql`
  mutation AddProductToPriorityList($input: AddProductToPriorityListInput!) {
    addProductToPriorityList(input: $input) {
      product {
        id
        canAddToPriorityList
        canRemoveFromPriorityList
        prioritized
      }
    }
  }
`;
export type AddProductToPriorityListMutationFn = Apollo.MutationFunction<
  AddProductToPriorityListMutation,
  AddProductToPriorityListMutationVariables
>;

/**
 * __useAddProductToPriorityListMutation__
 *
 * To run a mutation, you first call `useAddProductToPriorityListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductToPriorityListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductToPriorityListMutation, { data, loading, error }] = useAddProductToPriorityListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddProductToPriorityListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProductToPriorityListMutation,
    AddProductToPriorityListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddProductToPriorityListMutation,
    AddProductToPriorityListMutationVariables
  >(AddProductToPriorityListDocument, options);
}
export type AddProductToPriorityListMutationHookResult = ReturnType<
  typeof useAddProductToPriorityListMutation
>;
export type AddProductToPriorityListMutationResult =
  Apollo.MutationResult<AddProductToPriorityListMutation>;
export type AddProductToPriorityListMutationOptions = Apollo.BaseMutationOptions<
  AddProductToPriorityListMutation,
  AddProductToPriorityListMutationVariables
>;
