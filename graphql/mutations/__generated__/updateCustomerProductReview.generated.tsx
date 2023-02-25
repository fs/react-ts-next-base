import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCustomerProductReviewMutationVariables = Types.Exact<{
  input: Types.UpdateCustomerProductReviewInput;
}>;

export type UpdateCustomerProductReviewMutation = {
  __typename?: 'Mutation';
  updateCustomerProductReview?: {
    __typename?: 'ProductReview';
    id: string;
    productBody: string;
  } | null;
};

export const UpdateCustomerProductReviewDocument = gql`
  mutation UpdateCustomerProductReview($input: UpdateCustomerProductReviewInput!) {
    updateCustomerProductReview(input: $input) {
      id
      productBody
    }
  }
`;
export type UpdateCustomerProductReviewMutationFn = Apollo.MutationFunction<
  UpdateCustomerProductReviewMutation,
  UpdateCustomerProductReviewMutationVariables
>;

/**
 * __useUpdateCustomerProductReviewMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerProductReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerProductReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerProductReviewMutation, { data, loading, error }] = useUpdateCustomerProductReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCustomerProductReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCustomerProductReviewMutation,
    UpdateCustomerProductReviewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCustomerProductReviewMutation,
    UpdateCustomerProductReviewMutationVariables
  >(UpdateCustomerProductReviewDocument, options);
}
export type UpdateCustomerProductReviewMutationHookResult = ReturnType<
  typeof useUpdateCustomerProductReviewMutation
>;
export type UpdateCustomerProductReviewMutationResult =
  Apollo.MutationResult<UpdateCustomerProductReviewMutation>;
export type UpdateCustomerProductReviewMutationOptions = Apollo.BaseMutationOptions<
  UpdateCustomerProductReviewMutation,
  UpdateCustomerProductReviewMutationVariables
>;
