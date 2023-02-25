import React from 'react';

import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';
import { CustomerOrdersQueryResult } from 'graphql/queries/__generated__/customerOrders.generated';

import ProposalItem from './ProposalItem';

import {
  DisputeProposalsWrapper,
  ProposalWrapper,
  Title,
  ProposalItemWrapper,
  NoProposal,
} from './styled';

type TDisputeProposals = {
  order: OrderInfoFragment;
  isSeller: boolean;
  isAdmin: boolean;
  showActions: boolean;
  dispute: DisputeFragment;
  refetchOrders?: CustomerOrdersQueryResult['refetch'];
};

const DisputeProposals = ({
  order,
  isSeller,
  isAdmin,
  dispute,
  showActions = false,
  refetchOrders,
}: TDisputeProposals) => {
  const { lastBuyerProposal, lastSellerProposal } = dispute;

  return (
    <DisputeProposalsWrapper>
      <ProposalWrapper data-testid="buyer-proposal">
        <Title data-testid="buyer-proposal-title">
          {isSeller || isAdmin ? 'Решение покупателя' : 'Мое решение'}
        </Title>
        {lastBuyerProposal && (
          <ProposalItem
            order={order}
            dispute={dispute}
            proposal={lastBuyerProposal}
            isSeller={isSeller}
            isSellersProposal={false}
            showActions={showActions}
            refetchOrders={refetchOrders}
          />
        )}
      </ProposalWrapper>

      <ProposalWrapper data-testid="seller-proposal">
        <Title data-testid="seller-proposal-title">
          {isAdmin || !isSeller ? 'Решение продавца' : 'Мое решение'}
        </Title>
        {lastSellerProposal ? (
          <ProposalItem
            order={order}
            dispute={dispute}
            proposal={lastSellerProposal}
            isSeller={isSeller}
            isSellersProposal
            showActions={showActions}
            refetchOrders={refetchOrders}
          />
        ) : (
          <ProposalItemWrapper>
            <NoProposal>
              <div>
                {isSeller ? 'Решение еще не принято' : 'Продавец еще не принял решение по спору.'}
              </div>
              {showActions && (
                <img
                  src={`${process.env.ASSET_HOST}/images/empty-proposal.png`}
                  alt="no proposal"
                />
              )}
            </NoProposal>
          </ProposalItemWrapper>
        )}
      </ProposalWrapper>
    </DisputeProposalsWrapper>
  );
};

export default DisputeProposals;
