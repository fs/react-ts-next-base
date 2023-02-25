import React from 'react';
import { useCompaniesReviews } from 'lib/apollo/hooks/state/reviews';

import InfinityList from 'components/shared/organisms/InfinityList';
import CompanyReview from 'components/pages/admin/reviews/components/CompanyReview';
import { CompanyReviewOrderEnum } from 'graphql/types';
import { ReviewsWrapper } from './styled';

const AdminCompaniesReviews = ({ searchQuery, sortOrder }) => {
  const orderBy = sortOrder || CompanyReviewOrderEnum.CreatedAtAsc;

  const { reviews, fetchMore, loading, loadingMore, pageInfo } = useCompaniesReviews({
    companyName: searchQuery,
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
          <CompanyReview key={review.id} review={review} />
        ))}
      </ReviewsWrapper>
    </InfinityList>
  );
};

export default AdminCompaniesReviews;
