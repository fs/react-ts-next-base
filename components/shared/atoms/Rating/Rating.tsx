import React, { useState, useMemo, useEffect } from 'react';
import { StarIcon, RatingTitle, RatingWrapper } from './styled';
import { TRating } from './types';

const Rating: React.FunctionComponent<TRating> = ({
  rating = 0,
  setRating,
  hideRatingCount = false,
}) => {
  const [starRating, setStarRating] = useState(rating);
  const [displayedRating, setDisplayedRating] = useState(rating);

  const percentagePerStar = useMemo(
    () =>
      Array(5)
        .fill(0)
        .map((_, i) => Math.max(Math.min(displayedRating - i, 1), 0) * 100),
    [displayedRating],
  );

  useEffect(() => {
    setStarRating(rating);
    setDisplayedRating(rating);
  }, [rating]);

  return (
    <RatingWrapper>
      {percentagePerStar.map((percentage, i) => {
        return setRating ? (
          <StarIcon
            key={i}
            percentage={percentage}
            onMouseOver={() => setDisplayedRating(i + 1)}
            onClick={() => {
              setStarRating(displayedRating);
              setRating(displayedRating);
            }}
            onMouseLeave={() => setDisplayedRating(starRating)}
            $clickable
          />
        ) : (
          <StarIcon key={i} percentage={percentage} />
        );
      })}
      {!hideRatingCount && <RatingTitle>{starRating}</RatingTitle>}
    </RatingWrapper>
  );
};

export default Rating;
