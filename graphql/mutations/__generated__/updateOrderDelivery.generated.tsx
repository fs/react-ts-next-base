import * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOrderDeliveryMutationVariables = Types.Exact<{
  input: Types.UpdateOrderDeliveryInput;
}>;

export type UpdateOrderDeliveryMutation = {
  __typename?: 'Mutation';
  updateOrderDelivery?: {
    __typename?: 'Order';
    id: string;
    deliveryAddress?: string | null;
    deliveryPrice: number;
    deliveryService?: Types.DeliveryServiceEnum | null;
    deliveryMethod: Types.DeliveryMethodEnum;
    pickupDate?: any | null;
    deliveryMinDate?: any | null;
    deliveryMaxDate?: any | null;
    deliveryPointId?: string | null;
    companyLocation?: { __typename?: 'CompanyLocation'; id: string } | null;
  } | null;
};

export const UpdateOrderDeliveryDocument = gql`
  mutation UpdateOrderDelivery($input: UpdateOrderDeliveryInput!) {
    updateOrderDelivery(input: $input) {
      id
      companyLocation {
        id
      }
      deliveryAddress
      deliveryPrice
      deliveryService
      deliveryMethod
      pickupDate
      deliveryMinDate
      deliveryMaxDate
      deliveryPointId
    }
  }
`;
export type UpdateOrderDeliveryMutationFn = Apollo.MutationFunction<
  UpdateOrderDeliveryMutation,
  UpdateOrderDeliveryMutationVariables
>;

/**
 * __useUpdateOrderDeliveryMutation__
 *
 * To run a mutation, you first call `useUpdateOrderDeliveryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderDeliveryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderDeliveryMutation, { data, loading, error }] = useUpdateOrderDeliveryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrderDeliveryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateOrderDeliveryMutation,
    UpdateOrderDeliveryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateOrderDeliveryMutation, UpdateOrderDeliveryMutationVariables>(
    UpdateOrderDeliveryDocument,
    options,
  );
}
export type UpdateOrderDeliveryMutationHookResult = ReturnType<
  typeof useUpdateOrderDeliveryMutation
>;
export type UpdateOrderDeliveryMutationResult = Apollo.MutationResult<UpdateOrderDeliveryMutation>;
export type UpdateOrderDeliveryMutationOptions = Apollo.BaseMutationOptions<
  UpdateOrderDeliveryMutation,
  UpdateOrderDeliveryMutationVariables
>;
