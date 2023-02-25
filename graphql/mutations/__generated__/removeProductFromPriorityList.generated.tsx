import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveProductFromPriorityListMutationVariables = Types.Exact<{
  input: Types.RemoveProductFromPriorityListInput;
}>;

export type RemoveProductFromPriorityListMutation = {
  __typename?: 'Mutation';
  removeProductFromPriorityList?: {
    __typename?: 'RemoveProductFromPriorityListPayload';
    product: {
      __typename?: 'Product';
      id: string;
      canAddToPriorityList: boolean;
      canRemoveFromPriorityList: boolean;
      prioritized: boolean;
    };
  } | null;
};

export const RemoveProductFromPriorityListDocument = gql`
  mutation RemoveProductFromPriorityList($input: RemoveProductFromPriorityListInput!) {
    removeProductFromPriorityList(input: $input) {
      product {
        id
        canAddToPriorityList
        canRemoveFromPriorityList
        prioritized
      }
    }
  }
`;
export type RemoveProductFromPriorityListMutationFn = Apollo.MutationFunction<
  RemoveProductFromPriorityListMutation,
  RemoveProductFromPriorityListMutationVariables
>;

/**
 * __useRemoveProductFromPriorityListMutation__
 *
 * To run a mutation, you first call `useRemoveProductFromPriorityListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductFromPriorityListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductFromPriorityListMutation, { data, loading, error }] = useRemoveProductFromPriorityListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveProductFromPriorityListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveProductFromPriorityListMutation,
    RemoveProductFromPriorityListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveProductFromPriorityListMutation,
    RemoveProductFromPriorityListMutationVariables
  >(RemoveProductFromPriorityListDocument, options);
}
export type RemoveProductFromPriorityListMutationHookResult = ReturnType<
  typeof useRemoveProductFromPriorityListMutation
>;
export type RemoveProductFromPriorityListMutationResult =
  Apollo.MutationResult<RemoveProductFromPriorityListMutation>;
export type RemoveProductFromPriorityListMutationOptions = Apollo.BaseMutationOptions<
  RemoveProductFromPriorityListMutation,
  RemoveProductFromPriorityListMutationVariables
>;
