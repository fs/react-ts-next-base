import styled, { css } from 'styled-components';
import StarAxis from 'public/images/icons/review-star.svg';

export const Score = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    color: ${colors.orange};
    font-size: 0.9rem;
    font-weight: bold;
  `,
);

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StarAxisIcon = styled(StarAxis)``;

export const TooltipText = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background: ${colors.white};
    color: ${colors.greyA3};
    border: 1px solid ${colors.greyA3};
    font-size: 0.8rem;
  `,
);
