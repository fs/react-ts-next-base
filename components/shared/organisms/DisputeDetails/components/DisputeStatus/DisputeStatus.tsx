import React, { useMemo } from 'react';
import { add } from 'date-fns';

import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';
import { DisputeStatusEnum, ReturnedShipmentStatusEnum } from 'graphql/types';
import { dateDiff } from 'helpers';

import Icon from 'components/shared/atoms/Icon';

import { getDisputeProposalStatuses } from './constants';
import { DisputeStatusWrapper, DisputeTimer, Timer, DisputeStatusInfo } from './styled';

type TDisputeStatus = {
  dispute: DisputeFragment;
  isSeller: boolean;
  isAdmin: boolean;
};

const DisputeStatus = ({ dispute, isSeller, isAdmin }: TDisputeStatus) => {
  const {
    status,
    createdAt,
    returnShipmentDeadlineAt,
    returnedShipment,
    medagregatorResponseDeadlineAt,
  } = dispute;

  const direction = useMemo(() => {
    if (isSeller) return 'seller';
    if (isAdmin) return 'admin';
    return 'buyer';
  }, [isAdmin, isSeller]);

  const currentTime = new Date();
  const finishTime = useMemo(() => {
    if (status === DisputeStatusEnum.Discussing) return add(new Date(createdAt), { days: 10 });
    if (status === DisputeStatusEnum.MedagregatorIntervened)
      return new Date(medagregatorResponseDeadlineAt);
    if (
      status === DisputeStatusEnum.ProposalAccepted &&
      returnedShipment?.status !== ReturnedShipmentStatusEnum.Verified
    )
      return new Date(returnShipmentDeadlineAt);
    return currentTime;
  }, [dispute]);

  const timeRunOut = finishTime.getTime() - currentTime.getTime() < 0;
  const showTimer = finishTime.getTime() - currentTime.getTime() !== 0;
  const showTimerInText = isAdmin && status === DisputeStatusEnum.ProposalAccepted;

  const backgroundColor = useMemo(() => {
    if (
      !isAdmin &&
      status === DisputeStatusEnum.ProposalAccepted &&
      !returnedShipment &&
      timeRunOut
    )
      return 'error';
    return 'orange';
  }, [dispute, isAdmin]);

  const disputeProposal = useMemo(() => {
    const statusText = getDisputeProposalStatuses(dispute);
    if (
      status === DisputeStatusEnum.Discussing ||
      status === DisputeStatusEnum.MedagregatorIntervened
    )
      return statusText[status][direction];
    if (status === DisputeStatusEnum.ProposalAccepted) {
      if (returnedShipment) {
        return statusText[status][returnedShipment.status][direction];
      }
      return statusText[status][timeRunOut ? 'timeRunOut' : 'noReturnShipment'][direction];
    }
    return '';
  }, [dispute, isSeller]);

  return (
    <DisputeStatusWrapper data-testid="dispute-counter">
      {showTimer && !showTimerInText && (
        <DisputeTimer backgroundColor={backgroundColor}>
          <Icon name="timer" $color="white" $mr={12} $size={20} />
          <Timer>{dateDiff({ start: currentTime, end: finishTime })}</Timer>
        </DisputeTimer>
      )}
      {disputeProposal && (
        <DisputeStatusInfo backgroundColor={backgroundColor}>
          {showTimerInText && <Icon name="timer" $color="white" $mr={16} $size={20} />}
          {disputeProposal}
        </DisputeStatusInfo>
      )}
    </DisputeStatusWrapper>
  );
};

export default DisputeStatus;
