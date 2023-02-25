import React from 'react';

import { useBuyerCompanyReviews, useSellerCompanyReviews } from 'lib/apollo/hooks/state/reviews';
import CompanyReviewItem from 'components/shared/atoms/CompanyReviewItem';
import InfinityList from 'components/shared/organisms/InfinityList';

import { ReviewsHeader, ReviewsList } from './styled';

const CompanyReviewsList = ({
  isSeller,
  companyId,
  emptyListText,
  showCount = false,
  scrollableTarget,
}) => {
  const companyReviewsList = isSeller
    ? useSellerCompanyReviews({ sellerCompanyId: companyId, first: 12 })
    : useBuyerCompanyReviews({ buyerCompanyId: companyId, first: 12 });

  const { loading, loadingMore, pageInfo, fetchMore } = companyReviewsList;
  const companyReviewsData =
    companyReviewsList[isSeller ? 'sellerCompanyReviews' : 'buyerCompanyReviews'];

  const { endCursor, hasNextPage } = pageInfo;

  const onLoadMore = async () => {
    if (loadingMore) return;
    await fetchMore({ variables: { after: endCursor } });
  };

  return (
    <div data-testid="company-review-list">
      {showCount && <ReviewsHeader>Количество отзывов: {companyReviewsData?.length}</ReviewsHeader>}
      <InfinityList
        dataLength={companyReviewsData.length}
        loading={loading}
        hasNextPage={hasNextPage}
        onLoadMore={onLoadMore}
        scrollableTarget={scrollableTarget}
        descriptionEmptyMessage={emptyListText}
      >
        <ReviewsList>
          {companyReviewsData?.map(review => (
            <CompanyReviewItem key={review.id} isSeller={isSeller} review={review} />
          ))}
        </ReviewsList>
      </InfinityList>
    </div>
  );
};

export default CompanyReviewsList;
