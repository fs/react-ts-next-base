import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { useProductReviews } from 'lib/apollo/hooks/state/reviews';

import ModalWindow from 'components/shared/atoms/ModalWindow';
import CompanyReviewItem from 'components/shared/atoms/CompanyReviewItem';
import InfinityList from 'components/shared/organisms/InfinityList';

import {
  TitleWrapper,
  Title,
  BorderWrapper,
  BlueBorder,
  ModalBodyWrapper,
  ReviewsCount,
} from './styled';

const ReviewsModal = NiceModal.create(({ productId, isSeller, isAdmin }) => {
  const { visible, remove } = useModal();

  const { productReviews, loading, loadingMore, pageInfo, fetchMore } = useProductReviews({
    productId,
    first: 12,
  });
  const totalCount = productReviews[0]?.product?.receivedReviewsCount;

  const { endCursor, hasNextPage } = pageInfo;

  const onLoadMore = async () => {
    if (loadingMore) return;
    if (hasNextPage) {
      await fetchMore({ variables: { after: endCursor } });
    }
  };

  return (
    <ModalWindow isOpen={visible} setIsOpen={remove} $width="40rem" padding={0}>
      <TitleWrapper>
        <Title>Отзывы о товаре</Title>
      </TitleWrapper>
      <BorderWrapper>
        <BlueBorder />
      </BorderWrapper>
      <ReviewsCount>Количество отзывов: {loading ? 0 : totalCount ?? 0}</ReviewsCount>
      <ModalBodyWrapper id="modal-review-body">
        <InfinityList
          onLoadMore={onLoadMore}
          loading={loading}
          hasNextPage={hasNextPage}
          dataLength={productReviews.length}
          scrollableTarget="modal-review-body"
        >
          {productReviews?.map(review => (
            <CompanyReviewItem
              key={review?.id}
              review={review}
              isSeller={isSeller}
              isAdmin={isAdmin}
              isCompany={false}
            />
          ))}
        </InfinityList>
      </ModalBodyWrapper>
    </ModalWindow>
  );
});

export default ReviewsModal;
