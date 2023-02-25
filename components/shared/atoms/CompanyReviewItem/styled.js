import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const ReviewWrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: row;
    margin: 1rem 0.1rem 0;
    padding: 1.2rem 1rem;
    box-shadow: 0px 0px 6px ${transparentize(0.8, colors.blue00)};
  `,
);

export const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-content: flex-start;
  width: 13.5rem;
  min-width: 13.5rem;
`;

export const ReviewerNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;

  b {
    font-size: 0.875rem;
    line-height: 0.875rem;
  }
`;

export const CreatedAtDate = styled.p`
  font-size: 0.75rem;
  line-height: 0.875rem;
  opacity: 0.5;
  margin: 0 0 0.25rem;
`;

export const ReviewContentWrapper = styled.div`
  padding-left: 1rem;
  width: 100%;

  svg {
    width: 1.2rem;
  }
`;

export const ReviewContent = styled.p`
  font-size: 0.875rem;
  line-height: 1rem;
`;
