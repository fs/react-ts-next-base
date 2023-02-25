import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';

export type TCreateAdminDisputeProposal = {
  order: OrderInfoFragment;
  dispute: DisputeFragment;
};

export type TCurrentProposal = {
  dispute: DisputeFragment;
};
