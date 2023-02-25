import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FinishOrderDeliveryMutationVariables = Types.Exact<{
  input: Types.FinishOrderDeliveryInput;
}>;

export type FinishOrderDeliveryMutation = {
  __typename?: 'Mutation';
  finishOrderDelivery?: {
    __typename?: 'Order';
    id: string;
    executionStatus?: Types.OrderExecutionStatusEnum | null;
    canLeaveReview: {
      __typename?: 'AuthorizationResult';
      message?: string | null;
      value: boolean;
      reasons?: {
        __typename?: 'FailureReasons';
        details: string;
        fullMessages: Array<string>;
      } | null;
    };
  } | null;
};

export const FinishOrderDeliveryDocument = gql`
  mutation FinishOrderDelivery($input: FinishOrderDeliveryInput!) {
    finishOrderDelivery(input: $input) {
      id
      executionStatus
      canLeaveReview {
        message
        reasons {
          details
          fullMessages
        }
        value
      }
    }
  }
`;
export type FinishOrderDeliveryMutationFn = Apollo.MutationFunction<
  FinishOrderDeliveryMutation,
  FinishOrderDeliveryMutationVariables
>;

/**
 * __useFinishOrderDeliveryMutation__
 *
 * To run a mutation, you first call `useFinishOrderDeliveryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishOrderDeliveryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishOrderDeliveryMutation, { data, loading, error }] = useFinishOrderDeliveryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFinishOrderDeliveryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FinishOrderDeliveryMutation,
    FinishOrderDeliveryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<FinishOrderDeliveryMutation, FinishOrderDeliveryMutationVariables>(
    FinishOrderDeliveryDocument,
    options,
  );
}
export type FinishOrderDeliveryMutationHookResult = ReturnType<
  typeof useFinishOrderDeliveryMutation
>;
export type FinishOrderDeliveryMutationResult = Apollo.MutationResult<FinishOrderDeliveryMutation>;
export type FinishOrderDeliveryMutationOptions = Apollo.BaseMutationOptions<
  FinishOrderDeliveryMutation,
  FinishOrderDeliveryMutationVariables
>;
