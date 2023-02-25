import React, { FC } from 'react';
import { ReactSortable } from 'react-sortablejs';

import Loader from 'components/shared/atoms/Loader';
import { getExtension } from 'helpers';
import Photo from './Photo';

import { TPhotos } from './types';
import { PhotosWrapper, SortableWrapper, PhotoWrapper, PhotoContainer } from './styled';

const Photos: FC<TPhotos> = ({
  onRemovePhoto = () => {},
  onReorderPhoto = () => {},
  images = [],
  loading = false,
  editable = true,
  zoomable = true,
  draggable = false,
  testId,
  ...props
}) => {
  let aviFileCount = 0;

  const photos = images.map(({ id, url, metadata }) => {
    const type = getExtension(id, url);
    if (type === '.avi') aviFileCount += 1;
    return (
      <Photo
        name={id}
        url={url}
        fileName={metadata?.filename || 'image'}
        onRemovePhoto={onRemovePhoto}
        editable={editable}
        zoomable={zoomable}
        key={id}
        aviFileCount={aviFileCount}
      />
    );
  });

  return (
    <PhotosWrapper data-testid={testId} data-cy={testId} {...props}>
      {draggable && images.length >= 2 ? (
        <SortableWrapper>
          <ReactSortable list={images} setList={onReorderPhoto} animation={100}>
            {photos}
          </ReactSortable>
        </SortableWrapper>
      ) : (
        photos
      )}
      {loading && (
        <PhotoWrapper data-testid="add-photo-loader">
          <PhotoContainer>
            <Loader variant="simple" />
          </PhotoContainer>
        </PhotoWrapper>
      )}
    </PhotosWrapper>
  );
};

export default Photos;
