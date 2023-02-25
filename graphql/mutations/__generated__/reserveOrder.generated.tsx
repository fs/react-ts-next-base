import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReserveOrderMutationVariables = Types.Exact<{
  input: Types.ReserveOrderInput;
}>;

export type ReserveOrderMutation = {
  __typename?: 'Mutation';
  reserveOrder?: {
    __typename?: 'ReserveOrderPayload';
    message?: string | null;
    order: { __typename?: 'Order'; id: string };
  } | null;
};

export const ReserveOrderDocument = gql`
  mutation ReserveOrder($input: ReserveOrderInput!) {
    reserveOrder(input: $input) {
      message
      order {
        id
      }
    }
  }
`;
export type ReserveOrderMutationFn = Apollo.MutationFunction<
  ReserveOrderMutation,
  ReserveOrderMutationVariables
>;

/**
 * __useReserveOrderMutation__
 *
 * To run a mutation, you first call `useReserveOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReserveOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reserveOrderMutation, { data, loading, error }] = useReserveOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReserveOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<ReserveOrderMutation, ReserveOrderMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReserveOrderMutation, ReserveOrderMutationVariables>(
    ReserveOrderDocument,
    options,
  );
}
export type ReserveOrderMutationHookResult = ReturnType<typeof useReserveOrderMutation>;
export type ReserveOrderMutationResult = Apollo.MutationResult<ReserveOrderMutation>;
export type ReserveOrderMutationOptions = Apollo.BaseMutationOptions<
  ReserveOrderMutation,
  ReserveOrderMutationVariables
>;
