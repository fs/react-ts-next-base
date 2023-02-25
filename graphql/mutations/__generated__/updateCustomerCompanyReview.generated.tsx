import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCustomerCompanyReviewMutationVariables = Types.Exact<{
  input: Types.UpdateCustomerCompanyReviewInput;
}>;

export type UpdateCustomerCompanyReviewMutation = {
  __typename?: 'Mutation';
  updateCustomerCompanyReview?: {
    __typename?: 'CompanyReview';
    id: string;
    companyBody: string;
  } | null;
};

export const UpdateCustomerCompanyReviewDocument = gql`
  mutation UpdateCustomerCompanyReview($input: UpdateCustomerCompanyReviewInput!) {
    updateCustomerCompanyReview(input: $input) {
      id
      companyBody
    }
  }
`;
export type UpdateCustomerCompanyReviewMutationFn = Apollo.MutationFunction<
  UpdateCustomerCompanyReviewMutation,
  UpdateCustomerCompanyReviewMutationVariables
>;

/**
 * __useUpdateCustomerCompanyReviewMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerCompanyReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerCompanyReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerCompanyReviewMutation, { data, loading, error }] = useUpdateCustomerCompanyReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCustomerCompanyReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCustomerCompanyReviewMutation,
    UpdateCustomerCompanyReviewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCustomerCompanyReviewMutation,
    UpdateCustomerCompanyReviewMutationVariables
  >(UpdateCustomerCompanyReviewDocument, options);
}
export type UpdateCustomerCompanyReviewMutationHookResult = ReturnType<
  typeof useUpdateCustomerCompanyReviewMutation
>;
export type UpdateCustomerCompanyReviewMutationResult =
  Apollo.MutationResult<UpdateCustomerCompanyReviewMutation>;
export type UpdateCustomerCompanyReviewMutationOptions = Apollo.BaseMutationOptions<
  UpdateCustomerCompanyReviewMutation,
  UpdateCustomerCompanyReviewMutationVariables
>;
