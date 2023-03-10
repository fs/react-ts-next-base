import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RequestPasswordRecoveryMutationVariables = Types.Exact<{
  input: Types.RequestPasswordRecoveryInput;
}>;

export type RequestPasswordRecoveryMutation = {
  __typename?: 'Mutation';
  requestPasswordRecovery?: {
    __typename?: 'RequestPasswordRecoveryPayload';
    detail: string;
    message: string;
  } | null;
};

export const RequestPasswordRecoveryDocument = gql`
  mutation requestPasswordRecovery($input: RequestPasswordRecoveryInput!) {
    requestPasswordRecovery(input: $input) {
      detail
      message
    }
  }
`;
export type RequestPasswordRecoveryMutationFn = Apollo.MutationFunction<
  RequestPasswordRecoveryMutation,
  RequestPasswordRecoveryMutationVariables
>;

/**
 * __useRequestPasswordRecoveryMutation__
 *
 * To run a mutation, you first call `useRequestPasswordRecoveryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPasswordRecoveryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPasswordRecoveryMutation, { data, loading, error }] = useRequestPasswordRecoveryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestPasswordRecoveryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestPasswordRecoveryMutation,
    RequestPasswordRecoveryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RequestPasswordRecoveryMutation,
    RequestPasswordRecoveryMutationVariables
  >(RequestPasswordRecoveryDocument, options);
}
export type RequestPasswordRecoveryMutationHookResult = ReturnType<
  typeof useRequestPasswordRecoveryMutation
>;
export type RequestPasswordRecoveryMutationResult =
  Apollo.MutationResult<RequestPasswordRecoveryMutation>;
export type RequestPasswordRecoveryMutationOptions = Apollo.BaseMutationOptions<
  RequestPasswordRecoveryMutation,
  RequestPasswordRecoveryMutationVariables
>;
