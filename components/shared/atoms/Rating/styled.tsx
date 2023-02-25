import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';
import Star from 'public/images/icons/star.svg';
import { TStarIcon } from './types';

export const StarIcon = styled(Star)(
  ({ percentage, $clickable }: TStarIcon) => css`
    height: auto;
    margin: 0 0.1rem;
    cursor: ${$clickable && 'pointer'};

    rect {
      width: ${percentage}%;
      fill: ${theme.colors.orange};
    }
  `,
);

export const RatingTitle = styled.span`
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;
