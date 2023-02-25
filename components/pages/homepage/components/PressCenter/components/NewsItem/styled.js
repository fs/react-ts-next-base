import styled, { css } from 'styled-components';

export const NewsItemTitle = styled.h3`
  font-weight: normal;
  font-size: 0.8rem;
`;

export const NewsItemContent = styled.p(
  ({ theme: { colors } }) => css`
    color: ${colors.grey};
    font-size: 0.7rem;
  `,
);

export const NewsItemDate = styled.p(
  ({ theme: { colors } }) => css`
    color: ${colors.greyA3};
    font-size: 0.7rem;
  `,
);
