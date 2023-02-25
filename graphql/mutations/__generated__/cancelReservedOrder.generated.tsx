import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CancelReservedOrderMutationVariables = Types.Exact<{
  input: Types.CancelReservedOrderInput;
}>;

export type CancelReservedOrderMutation = {
  __typename?: 'Mutation';
  cancelReservedOrder?: {
    __typename?: 'Order';
    id: string;
    reservationStatus?: Types.OrderReservationStatusEnum | null;
  } | null;
};

export const CancelReservedOrderDocument = gql`
  mutation CancelReservedOrder($input: CancelReservedOrderInput!) {
    cancelReservedOrder(input: $input) {
      id
      reservationStatus
    }
  }
`;
export type CancelReservedOrderMutationFn = Apollo.MutationFunction<
  CancelReservedOrderMutation,
  CancelReservedOrderMutationVariables
>;

/**
 * __useCancelReservedOrderMutation__
 *
 * To run a mutation, you first call `useCancelReservedOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelReservedOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelReservedOrderMutation, { data, loading, error }] = useCancelReservedOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelReservedOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CancelReservedOrderMutation,
    CancelReservedOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CancelReservedOrderMutation, CancelReservedOrderMutationVariables>(
    CancelReservedOrderDocument,
    options,
  );
}
export type CancelReservedOrderMutationHookResult = ReturnType<
  typeof useCancelReservedOrderMutation
>;
export type CancelReservedOrderMutationResult = Apollo.MutationResult<CancelReservedOrderMutation>;
export type CancelReservedOrderMutationOptions = Apollo.BaseMutationOptions<
  CancelReservedOrderMutation,
  CancelReservedOrderMutationVariables
>;
