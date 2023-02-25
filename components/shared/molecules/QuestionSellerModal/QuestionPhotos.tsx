import React, { FC, useState } from 'react';

import Photos from 'components/shared/molecules/Photos';
import AddPhotosModal from 'components/shared/molecules/AddPhotosModal';

import { TFile, TUploadedFile } from 'config/types';

import {
  QuestionPhotosWrapper,
  DescriptionPhotos,
  ListPhotos,
  AddPhotoButtonWrapper,
} from './styled';
import { TQuestionPhotosProps } from './types';

const QuestionPhotos: FC<TQuestionPhotosProps> = ({ setFieldValue, values }) => {
  const [temporaryUrl, setTemporaryUrl] = useState<TFile[]>([]);
  const [loading, setLoading] = useState(false);

  const limitPhotos = 10;
  const islimitPhotosExceeded = values.photos.length >= limitPhotos;

  const onRemovePhoto = (imageId: string) => {
    setTemporaryUrl(temporaryUrl.filter(item => item.id !== imageId));
    setFieldValue(
      'photos',
      values.photos.filter(photo => photo.id !== imageId),
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
    setFieldValue('photos', [
      ...(values.photos || []),
      ...uploadedFiles.map(({ uploadedFile }) => uploadedFile),
    ]);
  };

  return (
    <QuestionPhotosWrapper>
      <DescriptionPhotos>
        <div>Фото и видео</div>
        <div>Не более 10</div>
      </DescriptionPhotos>
      <ListPhotos data-cy="photo-question-seller">
        {!islimitPhotosExceeded && (
          <AddPhotoButtonWrapper>
            <AddPhotosModal
              testId="photo-question-seller-button"
              loading={loading}
              setLoading={setLoading}
              onChange={onChange}
              onRemovePhoto={onRemovePhoto}
              temporaryUrl={temporaryUrl}
              isDisabled={false}
              documentFormats={['photo', 'video']}
              limitUpload={limitPhotos - values.photos.length}
            />
          </AddPhotoButtonWrapper>
        )}

        <Photos loading={loading} images={temporaryUrl} onRemovePhoto={onRemovePhoto} />
      </ListPhotos>
    </QuestionPhotosWrapper>
  );
};

export default QuestionPhotos;
