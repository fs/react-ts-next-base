import { TTheme } from 'public/styles/theme';
import styled, { css } from 'styled-components';

export const DisputeStatusWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  margin: 0 0 1.5rem;
`;

export const DisputeTimer = styled.div<{ backgroundColor: keyof TTheme['colors'] }>(
  ({ theme: { colors }, backgroundColor }) => css`
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    background-color: ${colors[backgroundColor]};
    color: ${colors.white};
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0.75rem 1.5rem;
  `,
);

export const Timer = styled.div`
  width: max-content;
`;

export const DisputeStatusInfo = styled.div<{ backgroundColor: keyof TTheme['colors'] }>(
  ({ theme: { colors }, backgroundColor }) => css`
    display: flex;
    align-items: center;
    background-color: ${colors[backgroundColor]};
    padding: 0.75rem 1.5rem;
    color: ${colors.white};
    font-weight: 600;
    font-size: 0.75rem;
    width: 100%;
  `,
);
