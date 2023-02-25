import * as Types from '../../types';

import { gql } from '@apollo/client';
import { ReturnedShipmentFragmentDoc } from '../../fragments/__generated__/returnedShipmentInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConfirmReturnedShipmentMutationVariables = Types.Exact<{
  input: Types.ConfirmReturnedShipmentInput;
}>;

export type ConfirmReturnedShipmentMutation = {
  __typename?: 'Mutation';
  confirmReturnedShipment?: {
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

export const ConfirmReturnedShipmentDocument = gql`
  mutation ConfirmReturnedShipment($input: ConfirmReturnedShipmentInput!) {
    confirmReturnedShipment(input: $input) {
      ...ReturnedShipment
    }
  }
  ${ReturnedShipmentFragmentDoc}
`;
export type ConfirmReturnedShipmentMutationFn = Apollo.MutationFunction<
  ConfirmReturnedShipmentMutation,
  ConfirmReturnedShipmentMutationVariables
>;

/**
 * __useConfirmReturnedShipmentMutation__
 *
 * To run a mutation, you first call `useConfirmReturnedShipmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmReturnedShipmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmReturnedShipmentMutation, { data, loading, error }] = useConfirmReturnedShipmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfirmReturnedShipmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmReturnedShipmentMutation,
    ConfirmReturnedShipmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConfirmReturnedShipmentMutation,
    ConfirmReturnedShipmentMutationVariables
  >(ConfirmReturnedShipmentDocument, options);
}
export type ConfirmReturnedShipmentMutationHookResult = ReturnType<
  typeof useConfirmReturnedShipmentMutation
>;
export type ConfirmReturnedShipmentMutationResult =
  Apollo.MutationResult<ConfirmReturnedShipmentMutation>;
export type ConfirmReturnedShipmentMutationOptions = Apollo.BaseMutationOptions<
  ConfirmReturnedShipmentMutation,
  ConfirmReturnedShipmentMutationVariables
>;
