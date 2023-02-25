import React from 'react';
import { ProductReviewOrderEnum } from 'graphql/types';
import { useProductsReviews } from 'lib/apollo/hooks/state/reviews';

import ProductReview from 'components/shared/molecules/ProductReview';
import InfinityList from 'components/shared/organisms/InfinityList';
import { ReviewsWrapper } from './styled';

const AdminProductReviews = ({ searchQuery, sortOrder }) => {
  const orderBy = sortOrder || ProductReviewOrderEnum.CreatedAtAsc;
  const { reviews, fetchMore, loading, loadingMore, pageInfo } = useProductsReviews({
    searchQuery,
    first: 12,
    orderBy,
  });

  const { endCursor, hasNextPage } = pageInfo;

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: endCursor } });
  };

  return (
    <InfinityList
      onLoadMore={onLoadMore}
      loading={loading}
      hasNextPage={hasNextPage}
      dataLength={reviews.length}
      scrollableTarget="admin-template-content"
      $width="64rem"
    >
      <ReviewsWrapper>
        {reviews.map(review => (
          <ProductReview isAdminPage key={review.id} editable review={review} />
        ))}
      </ReviewsWrapper>
    </InfinityList>
  );
};

export default AdminProductReviews;
