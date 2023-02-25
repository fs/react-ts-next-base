import React from 'react';

import { disputeReason } from 'config/constants/dispute';

import Photos from 'components/shared/molecules/Photos';

import { DisputeReasons, DisputeReason, Subtitle, Comment } from './styled';
import { TCurrentProposal } from './types';

const CurrentProposal = ({ dispute }: TCurrentProposal) => {
  const { productDelivered, reason, comment, attachments } = dispute;
  const images = attachments.map(({ id, attachmentUrl, originalFilename }) => ({
    id,
    url: attachmentUrl,
    metadata: { filename: originalFilename || '' },
  }));

  return (
    <>
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
    </>
  );
};

export default CurrentProposal;
