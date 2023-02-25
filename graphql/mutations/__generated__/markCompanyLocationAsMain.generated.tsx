import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkCompanyLocationAsMainMutationVariables = Types.Exact<{
  input: Types.MarkCompanyLocationAsMainInput;
}>;

export type MarkCompanyLocationAsMainMutation = {
  __typename?: 'Mutation';
  markCompanyLocationAsMain?: { __typename?: 'CompanyLocation'; id: string } | null;
};

export const MarkCompanyLocationAsMainDocument = gql`
  mutation MarkCompanyLocationAsMain($input: MarkCompanyLocationAsMainInput!) {
    markCompanyLocationAsMain(input: $input) {
      id
    }
  }
`;
export type MarkCompanyLocationAsMainMutationFn = Apollo.MutationFunction<
  MarkCompanyLocationAsMainMutation,
  MarkCompanyLocationAsMainMutationVariables
>;

/**
 * __useMarkCompanyLocationAsMainMutation__
 *
 * To run a mutation, you first call `useMarkCompanyLocationAsMainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkCompanyLocationAsMainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markCompanyLocationAsMainMutation, { data, loading, error }] = useMarkCompanyLocationAsMainMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarkCompanyLocationAsMainMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkCompanyLocationAsMainMutation,
    MarkCompanyLocationAsMainMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    MarkCompanyLocationAsMainMutation,
    MarkCompanyLocationAsMainMutationVariables
  >(MarkCompanyLocationAsMainDocument, options);
}
export type MarkCompanyLocationAsMainMutationHookResult = ReturnType<
  typeof useMarkCompanyLocationAsMainMutation
>;
export type MarkCompanyLocationAsMainMutationResult =
  Apollo.MutationResult<MarkCompanyLocationAsMainMutation>;
export type MarkCompanyLocationAsMainMutationOptions = Apollo.BaseMutationOptions<
  MarkCompanyLocationAsMainMutation,
  MarkCompanyLocationAsMainMutationVariables
>;
