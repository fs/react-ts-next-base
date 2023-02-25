import React from 'react';
import { RateText, RateWrapper } from './styled';
import { TRate } from './types';
import Icon from '../Icon';

const Rate: React.FunctionComponent<TRate> = ({ rating }) => {
  return (
    <RateWrapper>
      <Icon name="star" $color={rating ? 'orange' : 'greyC4'} />
      {!!rating && <RateText>{rating}</RateText>}
    </RateWrapper>
  );
};

export default Rate;
