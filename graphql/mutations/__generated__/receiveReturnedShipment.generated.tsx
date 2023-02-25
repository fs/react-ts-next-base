import * as Types from '../../types';

import { gql } from '@apollo/client';
import { DisputeFragmentDoc } from '../../fragments/__generated__/disputeInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReceiveReturnedShipmentMutationVariables = Types.Exact<{
  input: Types.ReceiveReturnedShipmentInput;
}>;

export type ReceiveReturnedShipmentMutation = {
  __typename?: 'Mutation';
  receiveReturnedShipment?: {
    __typename?: 'Dispute';
    comment?: string | null;
    createdAt: any;
    id: string;
    productDelivered: boolean;
    reason: Types.DisputeReasonEnum;
    returnShipmentDeadlineAt?: any | null;
    status: Types.DisputeStatusEnum;
    medagregatorResponseDeadlineAt?: any | null;
    acceptedProposal?: {
      __typename?: 'DisputeProposal';
      comment?: string | null;
      createdAt: any;
      deliveryReturnAmount?: number | null;
      id: string;
      originator: Types.DisputeProposalOriginatorEnum;
      productReturnAmount: number;
      returnPayer?: Types.DisputeProposalReturnPayerEnum | null;
      returnQuantity?: number | null;
      returnRequired: boolean;
      status: Types.DisputeProposalStatusEnum;
    } | null;
    attachments: Array<{
      __typename?: 'DisputeAttachment';
      attachmentUrl: string;
      originalFilename?: string | null;
      id: string;
    }>;
    canCancel: {
      __typename?: 'AuthorizationResult';
      message?: string | null;
      value: boolean;
      reasons?: {
        __typename?: 'FailureReasons';
        details: string;
        fullMessages: Array<string>;
      } | null;
    };
    canCreateProposal: {
      __typename?: 'AuthorizationResult';
      message?: string | null;
      value: boolean;
      reasons?: {
        __typename?: 'FailureReasons';
        details: string;
        fullMessages: Array<string>;
      } | null;
    };
    canAcceptProposal: {
      __typename?: 'AuthorizationResult';
      message?: string | null;
      value: boolean;
      reasons?: {
        __typename?: 'FailureReasons';
        details: string;
        fullMessages: Array<string>;
      } | null;
    };
    canCreateReturnedShipment: {
      __typename?: 'AuthorizationResult';
      message?: string | null;
      value: boolean;
      reasons?: {
        __typename?: 'FailureReasons';
        details: string;
        fullMessages: Array<string>;
      } | null;
    };
    canReceiveReturnedShipment: {
      __typename?: 'AuthorizationResult';
      message?: string | null;
      value: boolean;
      reasons?: {
        __typename?: 'FailureReasons';
        details: string;
        fullMessages: Array<string>;
      } | null;
    };
    canRequestSupport: {
      __typename?: 'AuthorizationResult';
      message?: string | null;
      value: boolean;
      reasons?: {
        __typename?: 'FailureReasons';
        details: string;
        fullMessages: Array<string>;
      } | null;
    };
    canViewProposals: {
      __typename?: 'AuthorizationResult';
      message?: string | null;
      value: boolean;
      reasons?: {
        __typename?: 'FailureReasons';
        details: string;
        fullMessages: Array<string>;
      } | null;
    };
    lastBuyerProposal?: {
      __typename?: 'DisputeProposal';
      comment?: string | null;
      createdAt: any;
      deliveryReturnAmount?: number | null;
      id: string;
      originator: Types.DisputeProposalOriginatorEnum;
      productReturnAmount: number;
      returnPayer?: Types.DisputeProposalReturnPayerEnum | null;
      returnQuantity?: number | null;
      returnRequired: boolean;
      status: Types.DisputeProposalStatusEnum;
    } | null;
    lastSellerProposal?: {
      __typename?: 'DisputeProposal';
      comment?: string | null;
      createdAt: any;
      deliveryReturnAmount?: number | null;
      id: string;
      originator: Types.DisputeProposalOriginatorEnum;
      productReturnAmount: number;
      returnPayer?: Types.DisputeProposalReturnPayerEnum | null;
      returnQuantity?: number | null;
      returnRequired: boolean;
      status: Types.DisputeProposalStatusEnum;
    } | null;
    returnedShipment?: {
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
  } | null;
};

export const ReceiveReturnedShipmentDocument = gql`
  mutation ReceiveReturnedShipment($input: ReceiveReturnedShipmentInput!) {
    receiveReturnedShipment(input: $input) {
      ...Dispute
    }
  }
  ${DisputeFragmentDoc}
`;
export type ReceiveReturnedShipmentMutationFn = Apollo.MutationFunction<
  ReceiveReturnedShipmentMutation,
  ReceiveReturnedShipmentMutationVariables
>;

/**
 * __useReceiveReturnedShipmentMutation__
 *
 * To run a mutation, you first call `useReceiveReturnedShipmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReceiveReturnedShipmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [receiveReturnedShipmentMutation, { data, loading, error }] = useReceiveReturnedShipmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReceiveReturnedShipmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReceiveReturnedShipmentMutation,
    ReceiveReturnedShipmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ReceiveReturnedShipmentMutation,
    ReceiveReturnedShipmentMutationVariables
  >(ReceiveReturnedShipmentDocument, options);
}
export type ReceiveReturnedShipmentMutationHookResult = ReturnType<
  typeof useReceiveReturnedShipmentMutation
>;
export type ReceiveReturnedShipmentMutationResult =
  Apollo.MutationResult<ReceiveReturnedShipmentMutation>;
export type ReceiveReturnedShipmentMutationOptions = Apollo.BaseMutationOptions<
  ReceiveReturnedShipmentMutation,
  ReceiveReturnedShipmentMutationVariables
>;
