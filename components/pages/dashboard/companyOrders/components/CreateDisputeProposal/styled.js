import styled, { css } from 'styled-components';

export const CreateDisputeProposalWrapper = styled.div`
  padding: 1.5rem 0 0;
`;

export const Title = styled.h2`
  font-size: 0.875rem;
  font-weight: bold;
  margin: 0 0 1.5rem;
`;

export const DisputeInfo = styled.div(
  ({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.greyCC};
    margin: 0 0 1rem;
  `,
);

export const DisputeReasons = styled.div`
  margin: 0 0 1.5rem;
`;

export const DisputeReason = styled.div`
  font-size: 0.75rem;

  &:not(:first-child) {
    margin: 0.5rem 0 0;
  }
`;

export const Subtitle = styled.h2(
  ({ theme: { colors } }) => css`
    color: ${colors.blue00};
    font-size: 0.875rem;
    margin: 0 0 1rem;
  `,
);

export const Comment = styled.div`
  margin: 0 0 1.5rem;
`;
