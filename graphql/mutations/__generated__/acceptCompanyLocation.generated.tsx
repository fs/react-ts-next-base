import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AcceptCompanyLocationMutationVariables = Types.Exact<{
  input: Types.AcceptCompanyLocationInput;
}>;

export type AcceptCompanyLocationMutation = {
  __typename?: 'Mutation';
  acceptCompanyLocation?: { __typename?: 'CompanyLocation'; id: string } | null;
};

export const AcceptCompanyLocationDocument = gql`
  mutation AcceptCompanyLocation($input: AcceptCompanyLocationInput!) {
    acceptCompanyLocation(input: $input) {
      id
    }
  }
`;
export type AcceptCompanyLocationMutationFn = Apollo.MutationFunction<
  AcceptCompanyLocationMutation,
  AcceptCompanyLocationMutationVariables
>;

/**
 * __useAcceptCompanyLocationMutation__
 *
 * To run a mutation, you first call `useAcceptCompanyLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptCompanyLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptCompanyLocationMutation, { data, loading, error }] = useAcceptCompanyLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptCompanyLocationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AcceptCompanyLocationMutation,
    AcceptCompanyLocationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AcceptCompanyLocationMutation, AcceptCompanyLocationMutationVariables>(
    AcceptCompanyLocationDocument,
    options,
  );
}
export type AcceptCompanyLocationMutationHookResult = ReturnType<
  typeof useAcceptCompanyLocationMutation
>;
export type AcceptCompanyLocationMutationResult =
  Apollo.MutationResult<AcceptCompanyLocationMutation>;
export type AcceptCompanyLocationMutationOptions = Apollo.BaseMutationOptions<
  AcceptCompanyLocationMutation,
  AcceptCompanyLocationMutationVariables
>;
