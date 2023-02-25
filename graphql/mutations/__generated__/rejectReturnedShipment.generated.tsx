import * as Types from '../../types';

import { gql } from '@apollo/client';
import { ReturnedShipmentFragmentDoc } from '../../fragments/__generated__/returnedShipmentInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RejectReturnedShipmentMutationVariables = Types.Exact<{
  input: Types.RejectReturnedShipmentInput;
}>;

export type RejectReturnedShipmentMutation = {
  __typename?: 'Mutation';
  rejectReturnedShipment?: {
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

export const RejectReturnedShipmentDocument = gql`
  mutation RejectReturnedShipment($input: RejectReturnedShipmentInput!) {
    rejectReturnedShipment(input: $input) {
      ...ReturnedShipment
    }
  }
  ${ReturnedShipmentFragmentDoc}
`;
export type RejectReturnedShipmentMutationFn = Apollo.MutationFunction<
  RejectReturnedShipmentMutation,
  RejectReturnedShipmentMutationVariables
>;

/**
 * __useRejectReturnedShipmentMutation__
 *
 * To run a mutation, you first call `useRejectReturnedShipmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectReturnedShipmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectReturnedShipmentMutation, { data, loading, error }] = useRejectReturnedShipmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRejectReturnedShipmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RejectReturnedShipmentMutation,
    RejectReturnedShipmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RejectReturnedShipmentMutation,
    RejectReturnedShipmentMutationVariables
  >(RejectReturnedShipmentDocument, options);
}
export type RejectReturnedShipmentMutationHookResult = ReturnType<
  typeof useRejectReturnedShipmentMutation
>;
export type RejectReturnedShipmentMutationResult =
  Apollo.MutationResult<RejectReturnedShipmentMutation>;
export type RejectReturnedShipmentMutationOptions = Apollo.BaseMutationOptions<
  RejectReturnedShipmentMutation,
  RejectReturnedShipmentMutationVariables
>;
