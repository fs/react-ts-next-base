import React from 'react';
import { useField, ErrorMessage } from 'formik';

import Rating from 'components/shared/atoms/Rating';
import Counter from 'components/shared/molecules/Counter';

import { TRatingInput } from './types';
import { RatingWrapper, ErrorRating } from './styled';

const RatingInput: React.FunctionComponent<TRatingInput> = ({ name }) => {
  const [, { value: rating }, { setValue }] = useField(name);
  return (
    <RatingWrapper>
      <Rating rating={rating} setRating={setValue} hideRatingCount />

      <Counter name={name} min={1} max={5} size="extra-small" $width="6rem" $ml={16} />

      <ErrorMessage name={name} render={msg => <ErrorRating>{msg}</ErrorRating>} />
    </RatingWrapper>
  );
};

export default RatingInput;
