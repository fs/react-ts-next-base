import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveCompanyFromBlackListMutationVariables = Types.Exact<{
  input: Types.RemoveCompanyFromBlacklistInput;
}>;

export type RemoveCompanyFromBlackListMutation = {
  __typename?: 'Mutation';
  removeCompanyFromBlacklist?: { __typename?: 'Company'; id: string } | null;
};

export const RemoveCompanyFromBlackListDocument = gql`
  mutation RemoveCompanyFromBlackList($input: RemoveCompanyFromBlacklistInput!) {
    removeCompanyFromBlacklist(input: $input) {
      id
    }
  }
`;
export type RemoveCompanyFromBlackListMutationFn = Apollo.MutationFunction<
  RemoveCompanyFromBlackListMutation,
  RemoveCompanyFromBlackListMutationVariables
>;

/**
 * __useRemoveCompanyFromBlackListMutation__
 *
 * To run a mutation, you first call `useRemoveCompanyFromBlackListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCompanyFromBlackListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCompanyFromBlackListMutation, { data, loading, error }] = useRemoveCompanyFromBlackListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveCompanyFromBlackListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveCompanyFromBlackListMutation,
    RemoveCompanyFromBlackListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveCompanyFromBlackListMutation,
    RemoveCompanyFromBlackListMutationVariables
  >(RemoveCompanyFromBlackListDocument, options);
}
export type RemoveCompanyFromBlackListMutationHookResult = ReturnType<
  typeof useRemoveCompanyFromBlackListMutation
>;
export type RemoveCompanyFromBlackListMutationResult =
  Apollo.MutationResult<RemoveCompanyFromBlackListMutation>;
export type RemoveCompanyFromBlackListMutationOptions = Apollo.BaseMutationOptions<
  RemoveCompanyFromBlackListMutation,
  RemoveCompanyFromBlackListMutationVariables
>;
