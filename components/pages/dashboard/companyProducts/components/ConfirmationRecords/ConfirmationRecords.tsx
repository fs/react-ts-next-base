import React, { FC, useState } from 'react';
import { ErrorMessage } from 'formik';

import { TFile, TUploadedFile } from 'config/types';

import Icon from 'components/shared/atoms/Icon';
import Tooltip from 'components/shared/atoms/Tooltip';
import Photos from 'components/shared/molecules/Photos';
import AddPhotosModal from 'components/shared/molecules/AddPhotosModal';

import {
  ConfirmationRecordsWrapper,
  Title,
  Description,
  ConfirmationPhotosWrapper,
  AddPhotoButtonWrapper,
  ErrorWrapper,
  IconWrapper,
} from './styled';
import { TConfirmationRecordsProps } from './types';

const ConfirmationRecords: FC<TConfirmationRecordsProps> = ({
  setFieldValue = () => {},
  productConfirmationRecords,
  readOnly = false,
}) => {
  const [temporaryUrl, setTemporaryUrl] = useState<TFile[]>(
    productConfirmationRecords.map(({ attachment: { id, url, metadata } }) => ({
      id,
      url,
      metadata,
    })),
  );
  const [loading, setLoading] = useState(false);
  const limitPhotos = 10;
  const islimitPhotosExceeded = productConfirmationRecords.length >= limitPhotos;

  const onRemovePhoto = (imageId: string) => {
    setTemporaryUrl(temporaryUrl.filter(item => item.id !== imageId));
    setFieldValue(
      'productConfirmationRecords',
      productConfirmationRecords.filter(({ attachment }) => attachment.id !== imageId),
    );
  };

  const onChange = (uploadedFiles: TUploadedFile[]) => {
    setTemporaryUrl([
      ...temporaryUrl,
      ...uploadedFiles.map(({ uploadedFile, url }) => ({
        id: uploadedFile.id,
        url,
        metadata: { filename: uploadedFile.metadata.filename },
      })),
    ]);
    setFieldValue('productConfirmationRecords', [
      ...(productConfirmationRecords || []),
      ...uploadedFiles.map(({ uploadedFile }) => ({ attachment: uploadedFile })),
    ]);
  };

  return (
    <ConfirmationRecordsWrapper>
      <Title>
        <span>Подтверждающие фото</span>
        <IconWrapper>
          <Tooltip text="Фото должны подтвердить наличие товара в количестве, указанном Вами">
            <Icon name="question" $size={22} $color="greyA3" />
          </Tooltip>
        </IconWrapper>
      </Title>
      <Description>Не более 10</Description>
      <ConfirmationPhotosWrapper data-cy="photo-confirmation-wrapper">
        {!islimitPhotosExceeded && !readOnly && (
          <AddPhotoButtonWrapper>
            <AddPhotosModal
              testId="photo-confirmation-modal-button"
              loading={loading}
              setLoading={setLoading}
              onChange={onChange}
              isDisabled={false}
              onRemovePhoto={onRemovePhoto}
              temporaryUrl={temporaryUrl}
              documentFormats={['photo']}
              limitUpload={limitPhotos - productConfirmationRecords.length}
            />
          </AddPhotoButtonWrapper>
        )}

        <Photos
          editable={!readOnly}
          loading={loading}
          images={temporaryUrl}
          onRemovePhoto={onRemovePhoto}
        />
      </ConfirmationPhotosWrapper>
      <ErrorMessage name="productConfirmationRecords">
        {msg => <ErrorWrapper>{msg}</ErrorWrapper>}
      </ErrorMessage>
    </ConfirmationRecordsWrapper>
  );
};

export default ConfirmationRecords;
