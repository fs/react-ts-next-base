import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DestroyCustomerCompanyLocationMutationVariables = Types.Exact<{
  input: Types.DestroyCustomerCompanyLocationInput;
}>;

export type DestroyCustomerCompanyLocationMutation = {
  __typename?: 'Mutation';
  destroyCustomerCompanyLocation?: { __typename?: 'CompanyLocation'; id: string } | null;
};

export const DestroyCustomerCompanyLocationDocument = gql`
  mutation DestroyCustomerCompanyLocation($input: DestroyCustomerCompanyLocationInput!) {
    destroyCustomerCompanyLocation(input: $input) {
      id
    }
  }
`;
export type DestroyCustomerCompanyLocationMutationFn = Apollo.MutationFunction<
  DestroyCustomerCompanyLocationMutation,
  DestroyCustomerCompanyLocationMutationVariables
>;

/**
 * __useDestroyCustomerCompanyLocationMutation__
 *
 * To run a mutation, you first call `useDestroyCustomerCompanyLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyCustomerCompanyLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyCustomerCompanyLocationMutation, { data, loading, error }] = useDestroyCustomerCompanyLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDestroyCustomerCompanyLocationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DestroyCustomerCompanyLocationMutation,
    DestroyCustomerCompanyLocationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DestroyCustomerCompanyLocationMutation,
    DestroyCustomerCompanyLocationMutationVariables
  >(DestroyCustomerCompanyLocationDocument, options);
}
export type DestroyCustomerCompanyLocationMutationHookResult = ReturnType<
  typeof useDestroyCustomerCompanyLocationMutation
>;
export type DestroyCustomerCompanyLocationMutationResult =
  Apollo.MutationResult<DestroyCustomerCompanyLocationMutation>;
export type DestroyCustomerCompanyLocationMutationOptions = Apollo.BaseMutationOptions<
  DestroyCustomerCompanyLocationMutation,
  DestroyCustomerCompanyLocationMutationVariables
>;
