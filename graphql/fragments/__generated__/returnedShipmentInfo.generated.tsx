import * as Types from '../../types';

import { gql } from '@apollo/client';
export type ReturnedShipmentFragment = {
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
};

export const ReturnedShipmentFragmentDoc = gql`
  fragment ReturnedShipment on ReturnedShipment {
    attachments {
      attachmentUrl
      originalFilename
      id
    }
    endDate
    id
    rejectComment
    startDate
    status
    canConfirm {
      message
      reasons {
        fullMessages
        details
      }
      value
    }
    canReject {
      message
      reasons {
        details
        fullMessages
      }
      value
    }
    canUpdate {
      message
      reasons {
        details
        fullMessages
      }
      value
    }
  }
`;
