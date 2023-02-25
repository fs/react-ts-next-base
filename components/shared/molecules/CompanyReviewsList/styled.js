import styled, { css } from 'styled-components';

export const ReviewsHeader = styled.h2(
  ({ theme: { colors } }) => css`
    margin: 0 0 2rem;
    color: ${colors.greyA3};
    font-size: 0.8rem;
    font-weight: normal;
  `,
);

export const ReviewsList = styled.div`
  padding: 0.2rem 0;
`;
