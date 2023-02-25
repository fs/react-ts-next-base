import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConfirmReservedOrderMutationVariables = Types.Exact<{
  input: Types.ConfirmReservedOrderInput;
}>;

export type ConfirmReservedOrderMutation = {
  __typename?: 'Mutation';
  confirmReservedOrder?: {
    __typename?: 'Order';
    id: string;
    reservationStatus?: Types.OrderReservationStatusEnum | null;
  } | null;
};

export const ConfirmReservedOrderDocument = gql`
  mutation ConfirmReservedOrder($input: ConfirmReservedOrderInput!) {
    confirmReservedOrder(input: $input) {
      id
      reservationStatus
    }
  }
`;
export type ConfirmReservedOrderMutationFn = Apollo.MutationFunction<
  ConfirmReservedOrderMutation,
  ConfirmReservedOrderMutationVariables
>;

/**
 * __useConfirmReservedOrderMutation__
 *
 * To run a mutation, you first call `useConfirmReservedOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmReservedOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmReservedOrderMutation, { data, loading, error }] = useConfirmReservedOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfirmReservedOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmReservedOrderMutation,
    ConfirmReservedOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ConfirmReservedOrderMutation, ConfirmReservedOrderMutationVariables>(
    ConfirmReservedOrderDocument,
    options,
  );
}
export type ConfirmReservedOrderMutationHookResult = ReturnType<
  typeof useConfirmReservedOrderMutation
>;
export type ConfirmReservedOrderMutationResult =
  Apollo.MutationResult<ConfirmReservedOrderMutation>;
export type ConfirmReservedOrderMutationOptions = Apollo.BaseMutationOptions<
  ConfirmReservedOrderMutation,
  ConfirmReservedOrderMutationVariables
>;
