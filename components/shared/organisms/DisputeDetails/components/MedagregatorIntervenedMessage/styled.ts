import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    padding: 1.5rem 1.875rem;
    margin-bottom: 1.5rem;
    font-size: 0.75rem;
    background: ${colors.white};
    box-shadow: 0 0 0.4rem ${transparentize(0.8, colors.shadow)};
  `,
);

export const Title = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.blue00};
    font-weight: bold;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
  `,
);
