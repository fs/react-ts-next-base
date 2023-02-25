import {
  DisputeProposalOriginatorEnum,
  DisputeProposalReturnPayerEnum,
  DisputeProposalStatusEnum,
} from 'graphql/types';

import { mockPageInfo } from './mockPageInfo';

export const mockDisputeProposals = [
  {
    __typename: 'DisputeProposal' as const,
    comment: null,
    createdAt: '2022-07-20T06:59:00Z',
    deliveryReturnAmount: 0,
    id: '4',
    originator: DisputeProposalOriginatorEnum.Buyer,
    productReturnAmount: 720,
    returnPayer: DisputeProposalReturnPayerEnum.Seller,
    returnQuantity: 18,
    returnRequired: true,
    status: DisputeProposalStatusEnum.Pending,
  },
  {
    __typename: 'DisputeProposal' as const,
    comment: 'comment',
    createdAt: '2022-07-27T13:41:19Z',
    deliveryReturnAmount: 0,
    id: '9',
    originator: DisputeProposalOriginatorEnum.Seller,
    productReturnAmount: 13,
    returnPayer: DisputeProposalReturnPayerEnum.Buyer,
    returnQuantity: 7,
    returnRequired: true,
    status: DisputeProposalStatusEnum.Pending,
  },
  {
    __typename: 'DisputeProposal' as const,
    comment: 'comment',
    createdAt: '2022-07-28T08:12:36Z',
    deliveryReturnAmount: 0,
    id: '11',
    originator: DisputeProposalOriginatorEnum.Buyer,
    productReturnAmount: 7,
    returnPayer: DisputeProposalReturnPayerEnum.Seller,
    returnQuantity: 3,
    returnRequired: false,
    status: DisputeProposalStatusEnum.Pending,
  },
];

export const mockDisputeProposalsData = {
  disputeProposals: {
    edges: mockDisputeProposals.map(proposal => ({ cursor: proposal.id, node: proposal })),
    pageInfo: mockPageInfo,
  },
};
