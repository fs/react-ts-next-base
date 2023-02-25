import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DestroyCompanyLocationMutationVariables = Types.Exact<{
  input: Types.DestroyCompanyLocationInput;
}>;

export type DestroyCompanyLocationMutation = {
  __typename?: 'Mutation';
  destroyCompanyLocation?: { __typename?: 'CompanyLocation'; id: string } | null;
};

export const DestroyCompanyLocationDocument = gql`
  mutation DestroyCompanyLocation($input: DestroyCompanyLocationInput!) {
    destroyCompanyLocation(input: $input) {
      id
    }
  }
`;
export type DestroyCompanyLocationMutationFn = Apollo.MutationFunction<
  DestroyCompanyLocationMutation,
  DestroyCompanyLocationMutationVariables
>;

/**
 * __useDestroyCompanyLocationMutation__
 *
 * To run a mutation, you first call `useDestroyCompanyLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyCompanyLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyCompanyLocationMutation, { data, loading, error }] = useDestroyCompanyLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDestroyCompanyLocationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DestroyCompanyLocationMutation,
    DestroyCompanyLocationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DestroyCompanyLocationMutation,
    DestroyCompanyLocationMutationVariables
  >(DestroyCompanyLocationDocument, options);
}
export type DestroyCompanyLocationMutationHookResult = ReturnType<
  typeof useDestroyCompanyLocationMutation
>;
export type DestroyCompanyLocationMutationResult =
  Apollo.MutationResult<DestroyCompanyLocationMutation>;
export type DestroyCompanyLocationMutationOptions = Apollo.BaseMutationOptions<
  DestroyCompanyLocationMutation,
  DestroyCompanyLocationMutationVariables
>;
