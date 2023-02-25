import React, { useMemo } from 'react';

import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';
import { CustomerOrdersQueryResult } from 'graphql/queries/__generated__/customerOrders.generated';
import { DisputeStatusEnum } from 'graphql/types';

import DisputeStatus from './components/DisputeStatus/DisputeStatus';
import DisputeProposals from './components/DisputeProposals';
import DisputeHistory from './components/DisputeHistory';
import DisputeAcceptedProposal from './components/DisputeAcceptedProposal';
import ConfirmReturnedShipment from './components/ConfirmReturnedShipment';
import MedagregatorIntervenedMessage from './components/MedagregatorIntervenedMessage';

import { DisputeCanceledWrapper, CanceledImage } from './styled';

type TDisputeDetails = {
  order: OrderInfoFragment;
  isAdmin?: boolean;
  dispute: DisputeFragment;
  refetchOrders?: CustomerOrdersQueryResult['refetch'];
};

const DisputeDetails = ({ order, isAdmin = false, refetchOrders, dispute }: TDisputeDetails) => {
  const { id: orderId, buyer, seller } = order;

  const isSeller = Boolean(seller?.myRole);
  const disputeCompany =
    useMemo(() => {
      if (seller?.myRole) return buyer;
      if (buyer?.myRole) return seller;
      return null;
    }, [order]) || null;

  return (
    <>
      {dispute.status === DisputeStatusEnum.Discussing && (
        <>
          <DisputeStatus dispute={dispute} isSeller={isSeller} isAdmin={isAdmin} />
          <DisputeProposals
            dispute={dispute}
            order={order}
            isAdmin={isAdmin}
            isSeller={isSeller}
            showActions={!isAdmin}
            refetchOrders={refetchOrders}
          />
          <DisputeHistory dispute={dispute} />
        </>
      )}

      {dispute.status === DisputeStatusEnum.Canceled && (
        <>
          <DisputeCanceledWrapper>
            <div data-testid="canceled-dispute">Спор отменен</div>
            <CanceledImage alt="agreement" src={`${process.env.ASSET_HOST}/images/agreement.png`} />
          </DisputeCanceledWrapper>
          <DisputeHistory dispute={dispute} />
        </>
      )}

      {dispute.status === DisputeStatusEnum.ProposalAccepted && dispute.acceptedProposal && (
        <>
          <DisputeStatus dispute={dispute} isSeller={isSeller} isAdmin={isAdmin} />
          {dispute.returnedShipment?.canConfirm.value && (
            <ConfirmReturnedShipment
              returnedShipment={dispute.returnedShipment}
              refetchOrders={refetchOrders}
            />
          )}
          <DisputeAcceptedProposal
            acceptedProposal={dispute.acceptedProposal}
            orderId={orderId}
            disputeCompany={disputeCompany}
          />
          <DisputeHistory dispute={dispute} />
        </>
      )}

      {dispute.status === DisputeStatusEnum.Finished && dispute.acceptedProposal && (
        <>
          <DisputeAcceptedProposal
            acceptedProposal={dispute.acceptedProposal}
            orderId={orderId}
            disputeCompany={disputeCompany}
          />
          <DisputeHistory dispute={dispute} />
        </>
      )}

      {dispute.status === DisputeStatusEnum.MedagregatorIntervened && (
        <>
          {dispute.medagregatorResponseDeadlineAt && (
            <DisputeStatus dispute={dispute} isSeller={isSeller} isAdmin={isAdmin} />
          )}
          {isAdmin ? (
            <DisputeProposals
              dispute={dispute}
              order={order}
              isAdmin={isAdmin}
              isSeller={isSeller}
              showActions={!isAdmin}
              refetchOrders={refetchOrders}
            />
          ) : (
            <MedagregatorIntervenedMessage isSeller={isSeller} />
          )}
          <DisputeHistory dispute={dispute} />
        </>
      )}
    </>
  );
};

export default DisputeDetails;
