import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BanCompanyMutationVariables = Types.Exact<{
  input: Types.BanCompanyInput;
}>;

export type BanCompanyMutation = {
  __typename?: 'Mutation';
  banCompany?: { __typename?: 'Message'; message: string } | null;
};

export const BanCompanyDocument = gql`
  mutation BanCompany($input: BanCompanyInput!) {
    banCompany(input: $input) {
      message
    }
  }
`;
export type BanCompanyMutationFn = Apollo.MutationFunction<
  BanCompanyMutation,
  BanCompanyMutationVariables
>;

/**
 * __useBanCompanyMutation__
 *
 * To run a mutation, you first call `useBanCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBanCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [banCompanyMutation, { data, loading, error }] = useBanCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBanCompanyMutation(
  baseOptions?: Apollo.MutationHookOptions<BanCompanyMutation, BanCompanyMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<BanCompanyMutation, BanCompanyMutationVariables>(
    BanCompanyDocument,
    options,
  );
}
export type BanCompanyMutationHookResult = ReturnType<typeof useBanCompanyMutation>;
export type BanCompanyMutationResult = Apollo.MutationResult<BanCompanyMutation>;
export type BanCompanyMutationOptions = Apollo.BaseMutationOptions<
  BanCompanyMutation,
  BanCompanyMutationVariables
>;
