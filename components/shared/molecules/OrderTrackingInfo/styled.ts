import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const OrderTrackingInfoWrapper = styled.div(
  ({ theme: { colors } }) => css`
    padding: 1.25rem 1.5rem;
    margin: 0 0 1rem;
    background: ${colors.white};
    box-shadow: 0 0 0.375rem ${transparentize(0.8, colors.blue00)};
  `,
);

export const Title = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 0.875rem;
  font-weight: bold;
`;

export const Row = styled.div<{ header?: boolean }>(
  ({ header }) => css`
    display: flex;
    margin: 0 0 1rem;
    font-weight: ${header && 'bold'};
  `,
);

export const Col = styled.div(
  ({ theme: { down, breakpoints } }) => css`
    font-size: 0.75rem;

    &:not(:last-child) {
      min-width: 10.5rem;
    }

    ${down(breakpoints.md)} {
      &:not(:last-child) {
        min-width: 7.5rem;
        width: 7.5rem;
      }
    }
  `,
);

export const TrackingPoints = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TrackingPoint = styled.div<{ current: boolean }>(
  ({ theme: { colors }, current }) => css`
    color: ${current && colors.green};
    font-weight: ${current && 'bold'};
    margin: 0 0 0.35rem;
  `,
);
