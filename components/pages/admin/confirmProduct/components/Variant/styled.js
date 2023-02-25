import styled, { css } from 'styled-components';

export const VarianTitle = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.orange};
    font-size: 20px;
    font-weight: bold;
    margin: 1.5rem 0;
  `,
);

export const UnVisibleFieldset = styled.fieldset(
  ({ $width }) => css`
    visibility: hidden;
    width: ${$width};
  `,
);
