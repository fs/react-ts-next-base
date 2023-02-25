import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RejectCompanyLocationMutationVariables = Types.Exact<{
  input: Types.RejectCompanyLocationInput;
}>;

export type RejectCompanyLocationMutation = {
  __typename?: 'Mutation';
  rejectCompanyLocation?: { __typename?: 'CompanyLocation'; id: string } | null;
};

export const RejectCompanyLocationDocument = gql`
  mutation RejectCompanyLocation($input: RejectCompanyLocationInput!) {
    rejectCompanyLocation(input: $input) {
      id
    }
  }
`;
export type RejectCompanyLocationMutationFn = Apollo.MutationFunction<
  RejectCompanyLocationMutation,
  RejectCompanyLocationMutationVariables
>;

/**
 * __useRejectCompanyLocationMutation__
 *
 * To run a mutation, you first call `useRejectCompanyLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectCompanyLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectCompanyLocationMutation, { data, loading, error }] = useRejectCompanyLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRejectCompanyLocationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RejectCompanyLocationMutation,
    RejectCompanyLocationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RejectCompanyLocationMutation, RejectCompanyLocationMutationVariables>(
    RejectCompanyLocationDocument,
    options,
  );
}
export type RejectCompanyLocationMutationHookResult = ReturnType<
  typeof useRejectCompanyLocationMutation
>;
export type RejectCompanyLocationMutationResult =
  Apollo.MutationResult<RejectCompanyLocationMutation>;
export type RejectCompanyLocationMutationOptions = Apollo.BaseMutationOptions<
  RejectCompanyLocationMutation,
  RejectCompanyLocationMutationVariables
>;
