import React from 'react';

import CompanyReviewsList from 'components/shared/molecules/CompanyReviewsList';
import ReviewsChart from 'components/shared/atoms/ReviewsChart';

import { useCompanyRatingHistory } from 'lib/apollo/hooks/state/companyRatingHistory';
import { Wrapper, ChartWrapper, ChartHeader, ReviewsWrapper, ReviewList } from './styled';

const CompanyReviews = ({ company }) => {
  const { unofficialName, id: companyId } = company;

  const { companyRatingHistory } = useCompanyRatingHistory({ companyId });
  const chart = [companyRatingHistory];

  return (
    <Wrapper data-testid="company-reviews-tab">
      <ChartHeader>
        График отслеживает изменение рейтинга продавца {unofficialName} в течение года
      </ChartHeader>
      <ChartWrapper>
        <ReviewsChart chart={chart} />
      </ChartWrapper>

      <ReviewsWrapper>
        <ReviewList>
          <CompanyReviewsList
            companyId={companyId}
            isSeller
            showCount
            emptyListText="У этой компании еще нет отзывов"
            scrollableTarget="layout-template-content"
          />
        </ReviewList>
      </ReviewsWrapper>
    </Wrapper>
  );
};

export default CompanyReviews;
