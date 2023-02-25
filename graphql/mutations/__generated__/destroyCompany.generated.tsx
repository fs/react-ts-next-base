import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DestroyCompanyMutationVariables = Types.Exact<{
  input: Types.DestroyCompanyInput;
}>;

export type DestroyCompanyMutation = {
  __typename?: 'Mutation';
  destroyCompany?: { __typename?: 'Message'; message: string } | null;
};

export const DestroyCompanyDocument = gql`
  mutation DestroyCompany($input: DestroyCompanyInput!) {
    destroyCompany(input: $input) {
      message
    }
  }
`;
export type DestroyCompanyMutationFn = Apollo.MutationFunction<
  DestroyCompanyMutation,
  DestroyCompanyMutationVariables
>;

/**
 * __useDestroyCompanyMutation__
 *
 * To run a mutation, you first call `useDestroyCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDestroyCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [destroyCompanyMutation, { data, loading, error }] = useDestroyCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDestroyCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<DestroyCompanyMutation, DestroyCompanyMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DestroyCompanyMutation, DestroyCompanyMutationVariables>(
    DestroyCompanyDocument,
    options,
  );
}
export type DestroyCompanyMutationHookResult = ReturnType<typeof useDestroyCompanyMutation>;
export type DestroyCompanyMutationResult = Apollo.MutationResult<DestroyCompanyMutation>;
export type DestroyCompanyMutationOptions = Apollo.BaseMutationOptions<
  DestroyCompanyMutation,
  DestroyCompanyMutationVariables
>;
