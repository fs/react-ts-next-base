import React from 'react';
import Photos from 'components/shared/molecules/Photos';

import { EmptyText, SectionTitle } from './styled';

export const urlType = {
  image: 'imageUrl',
  attachment: 'attachmentUrl',
};

const FilesSection = ({ title, isTitleBold = false, type, files }) => {
  const images = files.map(document => ({
    id: document.id,
    url: document[urlType[type]],
  }));

  return (
    <div>
      <SectionTitle isTitleBold={isTitleBold}>{title}</SectionTitle>
      {images.length === 0 ? (
        <EmptyText>Отсутствуют</EmptyText>
      ) : (
        <Photos images={images} editable={false} />
      )}
    </div>
  );
};
export default FilesSection;
