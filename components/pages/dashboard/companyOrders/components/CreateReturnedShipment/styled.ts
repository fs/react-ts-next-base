import styled, { css } from 'styled-components';

export const Title = styled.h2`
  font-size: 0.875rem;
  margin: 2rem 0 0.5rem;
`;

export const Description = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.greyA4};
    font-size: 0.75rem;
    margin: 0 0 1.5rem;
  `,
);

export const RejectionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.5rem;
`;

export const Subtitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 0.875rem;
  font-weight: 400;
`;

export const DateWrapper = styled.div`
  margin: 0 0 1.5rem;
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin: 1.25rem 0 0;
  }
`;
