import * as Types from '../../types';

import { gql } from '@apollo/client';
import { DisputeProposalFragmentDoc } from './disputeProposalInfo.generated';
import { ReturnedShipmentFragmentDoc } from './returnedShipmentInfo.generated';
export type DisputeFragment = {
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
};

export const DisputeFragmentDoc = gql`
  fragment Dispute on Dispute {
    acceptedProposal {
      ...DisputeProposal
    }
    attachments {
      attachmentUrl
      originalFilename
      id
    }
    canCancel {
      message
      reasons {
        details
        fullMessages
      }
      value
    }
    canCreateProposal {
      message
      reasons {
        details
        fullMessages
      }
      value
    }
    canAcceptProposal {
      message
      reasons {
        details
        fullMessages
      }
      value
    }
    canCreateReturnedShipment {
      message
      reasons {
        details
        fullMessages
      }
      value
    }
    canReceiveReturnedShipment {
      message
      reasons {
        details
        fullMessages
      }
      value
    }
    canRequestSupport {
      message
      reasons {
        details
        fullMessages
      }
      value
    }
    canViewProposals {
      message
      reasons {
        details
        fullMessages
      }
      value
    }
    comment
    createdAt
    id
    lastBuyerProposal {
      ...DisputeProposal
    }
    lastSellerProposal {
      ...DisputeProposal
    }
    productDelivered
    reason
    returnShipmentDeadlineAt
    returnedShipment {
      ...ReturnedShipment
    }
    status
    medagregatorResponseDeadlineAt
  }
  ${DisputeProposalFragmentDoc}
  ${ReturnedShipmentFragmentDoc}
`;
