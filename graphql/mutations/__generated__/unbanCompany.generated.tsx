import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnbanCompanyMutationVariables = Types.Exact<{
  input: Types.UnbanCompanyInput;
}>;

export type UnbanCompanyMutation = {
  __typename?: 'Mutation';
  unbanCompany?: { __typename?: 'Company'; id: string } | null;
};

export const UnbanCompanyDocument = gql`
  mutation UnbanCompany($input: UnbanCompanyInput!) {
    unbanCompany(input: $input) {
      id
    }
  }
`;
export type UnbanCompanyMutationFn = Apollo.MutationFunction<
  UnbanCompanyMutation,
  UnbanCompanyMutationVariables
>;

/**
 * __useUnbanCompanyMutation__
 *
 * To run a mutation, you first call `useUnbanCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnbanCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unbanCompanyMutation, { data, loading, error }] = useUnbanCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnbanCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<UnbanCompanyMutation, UnbanCompanyMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UnbanCompanyMutation, UnbanCompanyMutationVariables>(
    UnbanCompanyDocument,
    options,
  );
}
export type UnbanCompanyMutationHookResult = ReturnType<typeof useUnbanCompanyMutation>;
export type UnbanCompanyMutationResult = Apollo.MutationResult<UnbanCompanyMutation>;
export type UnbanCompanyMutationOptions = Apollo.BaseMutationOptions<
  UnbanCompanyMutation,
  UnbanCompanyMutationVariables
>;
