import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddCompanyToBlackListMutationVariables = Types.Exact<{
  input: Types.AddCompanyToBlacklistInput;
}>;

export type AddCompanyToBlackListMutation = {
  __typename?: 'Mutation';
  addCompanyToBlacklist?: { __typename?: 'Company'; id: string } | null;
};

export const AddCompanyToBlackListDocument = gql`
  mutation AddCompanyToBlackList($input: AddCompanyToBlacklistInput!) {
    addCompanyToBlacklist(input: $input) {
      id
    }
  }
`;
export type AddCompanyToBlackListMutationFn = Apollo.MutationFunction<
  AddCompanyToBlackListMutation,
  AddCompanyToBlackListMutationVariables
>;

/**
 * __useAddCompanyToBlackListMutation__
 *
 * To run a mutation, you first call `useAddCompanyToBlackListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCompanyToBlackListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCompanyToBlackListMutation, { data, loading, error }] = useAddCompanyToBlackListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCompanyToBlackListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCompanyToBlackListMutation,
    AddCompanyToBlackListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddCompanyToBlackListMutation, AddCompanyToBlackListMutationVariables>(
    AddCompanyToBlackListDocument,
    options,
  );
}
export type AddCompanyToBlackListMutationHookResult = ReturnType<
  typeof useAddCompanyToBlackListMutation
>;
export type AddCompanyToBlackListMutationResult =
  Apollo.MutationResult<AddCompanyToBlackListMutation>;
export type AddCompanyToBlackListMutationOptions = Apollo.BaseMutationOptions<
  AddCompanyToBlackListMutation,
  AddCompanyToBlackListMutationVariables
>;
