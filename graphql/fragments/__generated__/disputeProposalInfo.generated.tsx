import * as Types from '../../types';

import { gql } from '@apollo/client';
export type DisputeProposalFragment = {
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
};

export const DisputeProposalFragmentDoc = gql`
  fragment DisputeProposal on DisputeProposal {
    comment
    createdAt
    deliveryReturnAmount
    id
    originator
    productReturnAmount
    returnPayer
    returnQuantity
    returnRequired
    status
  }
`;
