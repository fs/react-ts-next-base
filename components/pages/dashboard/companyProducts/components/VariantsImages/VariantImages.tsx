import React, { FC, useState } from 'react';
import { ErrorMessage, useField } from 'formik';

import Photos from 'components/shared/molecules/Photos';
import AddPhotosModal from 'components/shared/molecules/AddPhotosModal';

import { TFile, TUploadedFile } from 'config/types';

import {
  Wrapper,
  Title,
  VariantImagesWrapper,
  AddImageButtonWrapper,
  ErrorWrapper,
} from './styled';
import { TVariantImagesProps } from './types';

const VariantImages: FC<TVariantImagesProps> = ({
  readOnly = false,
  name,
  index,
  variantImages = [],
  title,
  documentFormats,
  readOnlyTitle = '',
}) => {
  const [, , { setValue }] = useField(`variants.${index}.${name}`);
  const [temporaryUrl, setTemporaryUrl] = useState<TFile[]>(
    variantImages.map(({ image: { id, url, metadata } }) => ({ id, url, metadata })),
  );
  const [loading, setLoading] = useState(false);
  const limitPhotos = 10;
  const islimitPhotosExceeded = variantImages.length >= limitPhotos;

  const onRemoveImage = (imageId: string) => {
    setTemporaryUrl(temporaryUrl.filter(item => item.id !== imageId));
    setValue(variantImages.filter(({ image }) => image.id !== imageId));
  };

  const onReorderPhoto = (list: TFile[]) => {
    setTemporaryUrl(list);
    setValue(
      list.map(({ id, url, metadata }) => ({ image: metadata ? { id, metadata } : { id, url } })),
    );
  };

  const onChange = (uploadedFiles: TUploadedFile[]) => {
    setTemporaryUrl([
      ...temporaryUrl,
      ...uploadedFiles.map(({ uploadedFile, url }) => ({
        url,
        ...uploadedFile,
      })),
    ]);
    setValue([
      ...(variantImages || []),
      ...uploadedFiles.map(({ uploadedFile }) => ({ image: uploadedFile })),
    ]);
  };

  const showTitle = (readOnly && variantImages.length > 0) || !readOnly;

  return (
    <Wrapper>
      {showTitle && <Title>{!readOnly ? title : readOnlyTitle} </Title>}
      <VariantImagesWrapper data-cy={`variant-images-${name}`}>
        {!islimitPhotosExceeded && !readOnly && (
          <AddImageButtonWrapper>
            <AddPhotosModal
              testId={`add-photos-modal--${name}`}
              loading={loading}
              setLoading={setLoading}
              onChange={onChange}
              onRemovePhoto={onRemoveImage}
              temporaryUrl={temporaryUrl}
              isDisabled={false}
              documentFormats={documentFormats}
              limitUpload={limitPhotos - variantImages.length}
            />
          </AddImageButtonWrapper>
        )}
        <Photos
          editable={!readOnly}
          loading={loading}
          images={temporaryUrl}
          onRemovePhoto={onRemoveImage}
          onReorderPhoto={onReorderPhoto}
          draggable
        />
      </VariantImagesWrapper>
      <ErrorMessage name={`variants.${index}.${name}`}>
        {msg => <ErrorWrapper>{msg}</ErrorWrapper>}
      </ErrorMessage>
    </Wrapper>
  );
};

export default VariantImages;
