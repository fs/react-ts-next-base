import React from 'react';
import { useBuyerProductReviews, useSellerProductReviews } from 'lib/apollo/hooks/state/reviews';
import InfinityList from 'components/shared/organisms/InfinityList';
import ProductReview from './ProductReviewItem';
import { ReviewsList, ReviewsListWrapper } from './styled';

const ProductReviewsList = ({ isSeller, companyId, emptyListText }) => {
  const productReviews = isSeller
    ? useSellerProductReviews({ sellerCompanyId: companyId, first: 12 })
    : useBuyerProductReviews({ buyerCompanyId: companyId, first: 12 });

  const { loading, loadingMore, pageInfo, fetchMore } = productReviews;
  const productReviewsData =
    productReviews[isSeller ? 'sellerProductReviews' : 'buyerProductReviews'];

  const { endCursor, hasNextPage } = pageInfo;

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: endCursor } });
  };

  return (
    <ReviewsListWrapper data-testid="product-review-list">
      <InfinityList
        dataLength={productReviewsData.length}
        loading={loading}
        hasNextPage={hasNextPage}
        onLoadMore={onLoadMore}
        scrollableTarget="layout-template-content"
        descriptionEmptyMessage={emptyListText}
      >
        <ReviewsList>
          {productReviewsData?.map(review => (
            <ProductReview key={review.id} isSeller={isSeller} review={review} />
          ))}
        </ReviewsList>
      </InfinityList>
    </ReviewsListWrapper>
  );
};

export default ProductReviewsList;
