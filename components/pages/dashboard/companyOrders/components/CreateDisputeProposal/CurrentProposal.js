import React from 'react';

import { disputeReason } from 'config/constants/dispute';

import Photos from 'components/shared/molecules/Photos';
import DisputeProposals from 'components/shared/organisms/DisputeDetails/components/DisputeProposals';

import { DisputeInfo, DisputeReasons, DisputeReason, Subtitle, Comment } from './styled';

const CurrentProposal = ({ dispute, isSeller, order, companyId }) => {
  const { productDelivered, reason, comment, attachments } = dispute;
  const images = attachments.map(({ id, attachmentUrl }) => ({ id, url: attachmentUrl }));

  return (
    <>
      <DisputeInfo>
        <DisputeReasons>
          <Subtitle>Причина спора</Subtitle>
          <div>
            <DisputeReason>
              {productDelivered ? 'Товар доставлен' : 'Товар не доставлен'}
            </DisputeReason>
            <DisputeReason>{disputeReason[reason]}</DisputeReason>
          </div>
        </DisputeReasons>

        <Comment>
          <Subtitle>Комментарий к спору</Subtitle>
          <div>
            <DisputeReason>{comment || 'Отсутствует'}</DisputeReason>
          </div>
        </Comment>

        {!!attachments.length && <Photos editable={false} images={images} $mb={18} />}
      </DisputeInfo>

      <DisputeProposals dispute={dispute} isSeller={isSeller} companyId={companyId} order={order} />
    </>
  );
};

export default CurrentProposal;
