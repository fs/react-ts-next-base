import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const ImageWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;

    width: 100%;
    height: 100%;
    overflow: hidden;

    font-size: 0;

    border-radius: 50%;
    box-shadow: 1px 4px 4px ${transparentize(0.75, colors.black)};
  `,
);

export const Image = styled.img`
  position: absolute;
  inset: -9999px;

  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  margin: auto;
`;
