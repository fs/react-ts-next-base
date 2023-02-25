import React from 'react';

import Rating from 'components/shared/atoms/Rating';

import { ReviewContentWrapper, ReviewTitle } from './styled';
import { TReviewContent } from './types';

const ReviewContent = ({ companyReview, productReview }: TReviewContent) => {
  const { companyRating, companyBody } = companyReview || {};
  const { productRating, productBody } = productReview || {};

  const reviews = [
    {
      title: 'Отзыв о компании',
      subtitle: 'Комментарий о компании:',
      rating: companyRating,
      body: companyBody,
    },
    {
      title: 'Отзыв о товаре',
      subtitle: 'Комментарий о товаре:',
      rating: productRating,
      body: productBody,
    },
  ];

  return (
    <>
      {reviews.map(({ title, subtitle, rating, body }, index) => (
        <ReviewContentWrapper key={index}>
          <ReviewTitle>{title}</ReviewTitle>
          <Rating rating={rating} />
          <div>{subtitle}</div>
          <div>{body}</div>
        </ReviewContentWrapper>
      ))}
    </>
  );
};

export default ReviewContent;
