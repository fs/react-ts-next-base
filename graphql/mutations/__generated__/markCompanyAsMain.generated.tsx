import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkCompanyAsMainMutationVariables = Types.Exact<{
  input: Types.MarkCompanyAsMainInput;
}>;

export type MarkCompanyAsMainMutation = {
  __typename?: 'Mutation';
  markCompanyAsMain?: { __typename?: 'Company'; id: string } | null;
};

export const MarkCompanyAsMainDocument = gql`
  mutation MarkCompanyAsMain($input: MarkCompanyAsMainInput!) {
    markCompanyAsMain(input: $input) {
      id
    }
  }
`;
export type MarkCompanyAsMainMutationFn = Apollo.MutationFunction<
  MarkCompanyAsMainMutation,
  MarkCompanyAsMainMutationVariables
>;

/**
 * __useMarkCompanyAsMainMutation__
 *
 * To run a mutation, you first call `useMarkCompanyAsMainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkCompanyAsMainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markCompanyAsMainMutation, { data, loading, error }] = useMarkCompanyAsMainMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarkCompanyAsMainMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkCompanyAsMainMutation,
    MarkCompanyAsMainMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<MarkCompanyAsMainMutation, MarkCompanyAsMainMutationVariables>(
    MarkCompanyAsMainDocument,
    options,
  );
}
export type MarkCompanyAsMainMutationHookResult = ReturnType<typeof useMarkCompanyAsMainMutation>;
export type MarkCompanyAsMainMutationResult = Apollo.MutationResult<MarkCompanyAsMainMutation>;
export type MarkCompanyAsMainMutationOptions = Apollo.BaseMutationOptions<
  MarkCompanyAsMainMutation,
  MarkCompanyAsMainMutationVariables
>;
