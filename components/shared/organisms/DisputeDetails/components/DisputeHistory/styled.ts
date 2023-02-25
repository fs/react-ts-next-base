import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const DisputeHistoryWrapper = styled.div`
  margin: -0.5rem 0 1rem;
  position: relative;
`;

export const DisputeHistoryListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const DisputeHistoryItem = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 0.375rem ${transparentize(0.8, colors.blue00)};
    background-color: ${colors.white};
  `,
);

export const Header = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.blueEE};
    padding: 1rem 2rem;
    font-size: 0.875rem;
    font-weight: bold;
  `,
);

export const ProposalInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  row-gap: 0.75rem;
`;

export const Comment = styled.div`
  font-size: 0.75rem;
`;
