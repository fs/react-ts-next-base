import React, { FC, useState } from 'react';
import { useField } from 'formik';

import Photos from 'components/shared/molecules/Photos';
import AddPhotosModal from 'components/shared/molecules/AddPhotosModal';

import { Uploader } from 'graphql/types';
import { TFile, TUploadedFile } from 'config/types';

import { Description, AddFileWrapper } from './styled';
import { TUploadFilesDisputeProps } from './types';

const UploadFilesDispute: FC<TUploadFilesDisputeProps> = ({ photos }) => {
  const [temporaryUrl, setTemporaryUrl] = useState<TFile[]>([]);
  const [loading, setLoading] = useState(false);
  const limitPhotos = 10;
  const islimitPhotosExceeded = photos.length >= limitPhotos;
  const [, , { setValue }] = useField<{ attachment: Uploader }[]>('dispute.attachments');

  const onRemoveFile = (imageId: string) => {
    setTemporaryUrl(temporaryUrl.filter(item => item.id !== imageId));
    setValue(photos.filter(({ attachment }) => attachment.id !== imageId));
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
    setValue([
      ...photos,
      ...uploadedFiles.map(({ uploadedFile }) => ({ attachment: uploadedFile })),
    ]);
  };

  return (
    <>
      <Description>
        Загрузите фотографии и видео. Это повысит вероятность победы в споре
      </Description>
      <AddFileWrapper>
        {!islimitPhotosExceeded && (
          <AddPhotosModal
            testId="add-files-modal--photos"
            loading={loading}
            setLoading={setLoading}
            onChange={onChange}
            isDisabled={false}
            onRemovePhoto={onRemoveFile}
            temporaryUrl={temporaryUrl}
            documentFormats={['photo', 'video']}
            limitUpload={limitPhotos - photos.length}
          />
        )}
        <Photos
          loading={loading}
          images={temporaryUrl}
          onRemovePhoto={onRemoveFile}
          testId="list-photos"
          $ml={16}
        />
      </AddFileWrapper>
    </>
  );
};

export default UploadFilesDispute;
