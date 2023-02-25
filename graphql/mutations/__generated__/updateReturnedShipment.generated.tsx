import * as Types from '../../types';

import { gql } from '@apollo/client';
import { ReturnedShipmentFragmentDoc } from '../../fragments/__generated__/returnedShipmentInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateReturnedShipmentMutationVariables = Types.Exact<{
  input: Types.UpdateReturnedShipmentInput;
}>;

export type UpdateReturnedShipmentMutation = {
  __typename?: 'Mutation';
  updateReturnedShipment?: {
    __typename?: 'ReturnedShipment';
    endDate: any;
    id: string;
    rejectComment?: string | null;
    startDate: any;
    status: Types.ReturnedShipmentStatusEnum;
    attachments: Array<{
      __typename?: 'ReturnedShipmentAttachment';
      attachmentUrl: string;
      originalFilename?: string | null;
      id: string;
    }>;
    canConfirm: {
      __typename?: 'AuthorizationResult';
      message?: string | null;
      value: boolean;
      reasons?: {
        __typename?: 'FailureReasons';
        fullMessages: Array<string>;
        details: string;
      } | null;
    };
    canReject: {
      __typename?: 'AuthorizationResult';
      message?: string | null;
      value: boolean;
      reasons?: {
        __typename?: 'FailureReasons';
        details: string;
        fullMessages: Array<string>;
      } | null;
    };
    canUpdate: {
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

export const UpdateReturnedShipmentDocument = gql`
  mutation UpdateReturnedShipment($input: UpdateReturnedShipmentInput!) {
    updateReturnedShipment(input: $input) {
      ...ReturnedShipment
    }
  }
  ${ReturnedShipmentFragmentDoc}
`;
export type UpdateReturnedShipmentMutationFn = Apollo.MutationFunction<
  UpdateReturnedShipmentMutation,
  UpdateReturnedShipmentMutationVariables
>;

/**
 * __useUpdateReturnedShipmentMutation__
 *
 * To run a mutation, you first call `useUpdateReturnedShipmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReturnedShipmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReturnedShipmentMutation, { data, loading, error }] = useUpdateReturnedShipmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateReturnedShipmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateReturnedShipmentMutation,
    UpdateReturnedShipmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateReturnedShipmentMutation,
    UpdateReturnedShipmentMutationVariables
  >(UpdateReturnedShipmentDocument, options);
}
export type UpdateReturnedShipmentMutationHookResult = ReturnType<
  typeof useUpdateReturnedShipmentMutation
>;
export type UpdateReturnedShipmentMutationResult =
  Apollo.MutationResult<UpdateReturnedShipmentMutation>;
export type UpdateReturnedShipmentMutationOptions = Apollo.BaseMutationOptions<
  UpdateReturnedShipmentMutation,
  UpdateReturnedShipmentMutationVariables
>;
