import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const DisputeProposalsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
  margin: 0 0 1rem;
`;

export const ProposalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  margin: 0 0 1rem 2rem;
  font-size: 0.875rem;
`;

export const ProposalItemWrapper = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 0 auto;
    row-gap: 1rem;
    padding: 1.5rem 2rem;
    box-shadow: 0 0 0.375rem ${transparentize(0.8, colors.blue00)};
    font-size: 0.875rem;
  `,
);

export const ProposalInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
`;

export const NoProposal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 1rem;
  font-size: 0.875rem;
`;

export const Comment = styled.span`
  font-size: 0.75rem;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
