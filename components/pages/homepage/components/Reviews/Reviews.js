import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import { useProductRandomReview } from 'lib/apollo/hooks/state/products';
import { TIMES_ORDERED } from 'config/constants/orders';

import ProductReview from 'components/shared/molecules/ProductReview';
import { ReviewList, ReviewWrapper } from './styled';

const Reviews = () => {
  const { products } = useProductRandomReview({
    orderBy: TIMES_ORDERED,
    rating: 4,
    first: 5,
    reviewsPresence: true,
  });

  return (
    <ReviewList>
      <Carousel
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        autoPlay={false}
        transitionTime={500}
        axis="horizontal"
        swipeScrollTolerance={50}
      >
        {products.map(({ randomReview }) => (
          <ReviewWrapper key={randomReview.id}>
            <ProductReview review={randomReview} />
          </ReviewWrapper>
        ))}
      </Carousel>
    </ReviewList>
  );
};

export default Reviews;
