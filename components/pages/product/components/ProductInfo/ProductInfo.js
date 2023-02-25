import React from 'react';
import plural from 'plural-ru';
import NiceModal from '@ebay/nice-modal-react';

import Icon from 'components/shared/atoms/Icon';
import Rating from 'components/shared/atoms/Rating';
import Collapsible from 'components/shared/atoms/Collapsible';

import ReviewsModal from 'components/shared/molecules/ReviewsModal';
import ActionLink from 'components/shared/atoms/ActionLink';
import { SELLER } from 'config/constants/directions';
import { ProductInfoWrapper, Name, Code, Manufaturer, ReviewsWrapper } from './styled';

const ProductInfo = ({ product, isUserBuyer }) => {
  const {
    id: productId,
    name,
    manufacturer,
    description,
    favoritesCount,
    company: { direction },
    receivedReviewsCount: productReviewsCount,
    rating,
    variants,
  } = product;

  const [firstVariant] = variants;
  const { soldQuantity } = firstVariant || {};
  const isSeller = direction === SELLER;

  const accordion = [
    {
      name: 'description',
      heading: 'Описание товара',
      content: description,
      noContent: 'Описание отсутствует',
    },
  ];

  const showReviewsModal = () => {
    NiceModal.show(ReviewsModal, {
      productId,
      isSeller,
    });
  };

  return (
    <ProductInfoWrapper>
      <Name>{name}</Name>
      <Code>Код товара: {productId}</Code>
      <Manufaturer>Производитель: {manufacturer}</Manufaturer>
      <ReviewsWrapper>
        <strong>
          <Rating rating={rating} />
        </strong>
        <ActionLink
          onClick={showReviewsModal}
          label={plural(productReviewsCount ?? 0, '%d Отзыв', '%d Отзыва', '%d Отзывов')}
        />
        <div>{soldQuantity ?? 0} Продано</div>
        {isUserBuyer && (
          <div>
            {favoritesCount} <Icon name="heart" $size={18} $color="orange" $ml={6} />
          </div>
        )}
      </ReviewsWrapper>
      <Collapsible accordion={accordion} />
    </ProductInfoWrapper>
  );
};

export default ProductInfo;
