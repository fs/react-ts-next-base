import styled, { css } from 'styled-components';

export const ProductInfoWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    padding: 1.25rem 2rem 0.5rem;
    border-bottom: 1px solid ${colors.greyCC};
  `,
);

export const Name = styled.h1`
  font-size: 1rem;
  margin: 0 0 1rem;
`;

export const Code = styled.p`
  font-size: 0.75rem;
  margin: 0 0 0.5rem;
`;

export const Manufaturer = styled.p`
  font-weight: bold;
  font-size: 0.75rem;
  margin: 0 0 0.75rem;
`;

export const ReviewsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  font-size: 0.875rem;
  margin: 0 0 0.75rem;

  > div {
    display: flex;
    align-items: center;
  }

  > :not(:first-child) {
    margin-left: 1.5rem;
  }
`;
