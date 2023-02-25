import React from 'react';
import ActionLink from 'components/shared/atoms/ActionLink';

import { ImageContainer, Image } from './styled';
import { TProductImage, TImage } from './types';

const image = ({ photo, name }: TImage) => (
  <ImageContainer>
    {photo ? (
      <Image
        alt={name || ''}
        src={photo}
        style={{
          objectFit: 'contain',
        }}
      />
    ) : (
      <Image
        alt="photo-temporary"
        src={`${process.env.ASSET_HOST}/images/photo-temporary.svg`}
        style={{ width: 72 }}
      />
    )}
  </ImageContainer>
);

const ProductImage = ({ product, href }: TProductImage) => {
  const { name, draft, variants, template } = product;

  const [firstVariant] = variants;
  const { variantPhotos = [] } = firstVariant || {};
  const photo = variantPhotos[0]?.imageUrl || null;

  return (
    <>
      {draft && !template ? (
        <>{image({ photo, name })}</>
      ) : (
        <ActionLink href={href}>{image({ photo, name })}</ActionLink>
      )}
    </>
  );
};

export default ProductImage;
