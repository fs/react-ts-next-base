import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const DisputeAcceptedWrapper = styled.div(
  ({ theme: { colors } }) => css`
    margin: 0 0 1.5rem;
    box-shadow: 0 0 0.375rem ${transparentize(0.8, colors.blue00)};
    background-color: ${colors.white};
  `,
);

export const Header = styled.div(
  ({ theme: { colors } }) => css`
    background: ${colors.blueEE};
    padding: 0.75rem 2rem;
    font-size: 0.875rem;
    font-weight: bold;
  `,
);

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 1.5rem 2rem;
  row-gap: 1rem;
`;
