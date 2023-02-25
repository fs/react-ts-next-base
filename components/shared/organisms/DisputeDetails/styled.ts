import styled, { css } from 'styled-components';

export const DisputeStatusWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  margin: 0 0 1.5rem;
`;

export const DisputeTimer = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    flex: 0 1 auto;
    background-color: ${colors.orange};
    color: ${colors.white};
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0 1.5rem;
  `,
);

export const Timer = styled.div`
  width: max-content;
`;

export const DisputeStatusInfo = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    background-color: ${colors.orange};
    padding: 0.75rem 1.5rem;
    color: ${colors.white};
    font-weight: 600;
    font-size: 0.75rem;
  `,
);

export const ActionsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const DisputeCanceledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 0.875rem;
  margin: 0 0 1.5rem;
`;

export const CanceledImage = styled.img`
  max-width: 20rem;
  margin: 2rem 0 1rem;
`;
