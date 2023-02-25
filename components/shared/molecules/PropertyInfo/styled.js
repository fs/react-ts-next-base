import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const PropertyItem = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    padding: 0.625rem 1.875rem;
    background-color: ${colors.white};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    box-shadow: 0 0 0.4rem ${transparentize(0.8, colors.shadow)};
  `,
);

export const PropertyName = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
`;
