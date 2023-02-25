import React, { useState, useEffect } from 'react';

import { Carousel } from 'react-responsive-carousel';
import {
  useAddProductToFavorites,
  useRemoveProductFromFavorites,
} from 'lib/apollo/hooks/actions/product';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';

import { NOT_VERIFIED } from 'config/constants/status';

import {
  ProductPhotoWrapper,
  SelectedPhotoWrapper,
  SelectedPhoto,
  ActionsWrapper,
  ProductStatus,
  ProductPhotosSlider,
  ThumbnailsWrapper,
  Thumbnails,
  ScrolledWrapper,
  ThumbnailWrapper,
  Thumbnail,
} from './styled';

import { directions } from '../ProductContent/constants';

const ProductPhotos = ({
  variants,
  selectedPhoto,
  setSelectedPhoto,
  refThumbnails,
  setScroll,
  onSelectThumbnail,
  isFavoritesShown,
  product,
}) => {
  const { id, favorite, status, deleted, template } = product;
  const photos =
    variants
      ?.map(({ variantPhotos }) => variantPhotos)
      .flat(1)
      .map(({ imageUrl }) => imageUrl) || [];

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const scrollHandler = () => setScroll(refThumbnails.current?.scrollLeft);

  const subscribeScroll = () => window.addEventListener('scroll', scrollHandler, true);
  const unsubscribeScroll = () => window.removeEventListener('scroll', scrollHandler, true);

  const handleTouch = () => {
    if (touchEnd) {
      if (
        touchStart - touchEnd > 0 &&
        touchEnd !== touchStart &&
        selectedPhoto !== photos.length - 1
      ) {
        onSelectThumbnail(directions.RIGHT);
      } else if (selectedPhoto !== 0) {
        onSelectThumbnail(directions.LEFT);
      }
    }
  };

  useEffect(() => {
    subscribeScroll();
    return () => unsubscribeScroll();
  }, []);

  const [addProductToFavorites] = useAddProductToFavorites();
  const [removeProductFromFavorites] = useRemoveProductFromFavorites();

  const handleFavoritesButton = async () => {
    const action = favorite ? removeProductFromFavorites : addProductToFavorites;
    await action(id);
  };

  return (
    <>
      <ProductPhotoWrapper>
        <Carousel
          selectedItem={selectedPhoto}
          showThumbs={false}
          showArrows={false}
          showIndicators={false}
          showStatus={false}
          autoPlay={false}
          transitionTime={500}
          axis="horizontal"
          swipeScrollTolerance={50}
          onSwipeStart={e => setTouchStart(e.touches[0].clientX)}
          onSwipeMove={e => setTouchEnd(e.touches[0].clientX)}
          onSwipeEnd={e => handleTouch(e)}
          renderArrowPrev={() => <></>}
          renderArrowNext={() => <></>}
        >
          {photos.map((url, i) => (
            <SelectedPhotoWrapper key={i}>
              <SelectedPhoto alt="product-photo" src={url} />
            </SelectedPhotoWrapper>
          ))}
        </Carousel>

        <ActionsWrapper>
          <Button
            variant="confirm"
            size="large"
            shape="extra-rounded"
            iconType="only"
            icon={<Icon name="info" $color="white" $size={24} />}
          />
          {isFavoritesShown && (
            <Button
              variant="change"
              size="large"
              shape="extra-rounded"
              iconType="only"
              icon={<Icon name={favorite ? 'heart' : 'heart-line'} $color="white" $size={24} />}
              onClick={handleFavoritesButton}
            />
          )}
        </ActionsWrapper>
        {status === NOT_VERIFIED && !deleted && !template && (
          <ProductStatus>
            <Icon name="timer" $color="white" $size={20} $mr={12} />
            Мы проверяем ваш товар
          </ProductStatus>
        )}
      </ProductPhotoWrapper>
      <ProductPhotosSlider>
        <Button
          variant="hollow"
          iconType="only"
          icon={<Icon name="arrow-chevron-left" $color="grey" $size={16} />}
          disabled={selectedPhoto === 0}
          onClick={selectedPhoto ? () => onSelectThumbnail(directions.LEFT) : () => {}}
        />

        <ThumbnailsWrapper>
          <Thumbnails ref={refThumbnails}>
            <ScrolledWrapper>
              {photos.map((_, index) => (
                <ThumbnailWrapper
                  selected={selectedPhoto === index}
                  onClick={() => setSelectedPhoto(index)}
                  key={index}
                >
                  <Thumbnail alt="product-photo" src={photos[index]} />
                </ThumbnailWrapper>
              ))}
            </ScrolledWrapper>
          </Thumbnails>
        </ThumbnailsWrapper>

        <Button
          variant="hollow"
          iconType="only"
          size="small"
          icon={<Icon name="arrow-chevron-right" $color="grey" $size={16} />}
          disabled={selectedPhoto === photos.length - 1}
          onClick={
            selectedPhoto !== photos.length - 1
              ? () => onSelectThumbnail(directions.RIGHT)
              : () => {}
          }
        />
      </ProductPhotosSlider>
    </>
  );
};

export default ProductPhotos;
