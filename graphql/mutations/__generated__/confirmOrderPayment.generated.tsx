import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConfirmOrderPaymentMutationVariables = Types.Exact<{
  input: Types.ConfirmOrderPaymentInput;
}>;

export type ConfirmOrderPaymentMutation = {
  __typename?: 'Mutation';
  confirmOrderPayment?: {
    __typename?: 'Order';
    id: string;
    executionStatus?: Types.OrderExecutionStatusEnum | null;
  } | null;
};

export const ConfirmOrderPaymentDocument = gql`
  mutation ConfirmOrderPayment($input: ConfirmOrderPaymentInput!) {
    confirmOrderPayment(input: $input) {
      id
      executionStatus
    }
  }
`;
export type ConfirmOrderPaymentMutationFn = Apollo.MutationFunction<
  ConfirmOrderPaymentMutation,
  ConfirmOrderPaymentMutationVariables
>;

/**
 * __useConfirmOrderPaymentMutation__
 *
 * To run a mutation, you first call `useConfirmOrderPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmOrderPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmOrderPaymentMutation, { data, loading, error }] = useConfirmOrderPaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfirmOrderPaymentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmOrderPaymentMutation,
    ConfirmOrderPaymentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ConfirmOrderPaymentMutation, ConfirmOrderPaymentMutationVariables>(
    ConfirmOrderPaymentDocument,
    options,
  );
}
export type ConfirmOrderPaymentMutationHookResult = ReturnType<
  typeof useConfirmOrderPaymentMutation
>;
export type ConfirmOrderPaymentMutationResult = Apollo.MutationResult<ConfirmOrderPaymentMutation>;
export type ConfirmOrderPaymentMutationOptions = Apollo.BaseMutationOptions<
  ConfirmOrderPaymentMutation,
  ConfirmOrderPaymentMutationVariables
>;
