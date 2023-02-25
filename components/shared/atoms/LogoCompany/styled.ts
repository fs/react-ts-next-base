import styled, { css } from 'styled-components';
import { TWidth } from 'public/styles/config/width';

import { transparentize } from 'polished';
import { TLogoWrapper } from './types';

export const LogoWrapper = styled.div(
  ({ edit }: TLogoWrapper) => css`
    position: relative;
    max-width: 100%;
    min-width: max-content;
    height: 100%;
    display: flex;
    justify-content: ${edit ? 'flex-start' : 'center'};
    align-items: center;
  `,
);

export const ImageWrapper = styled.div`
  display: flex;
  border-radius: 1.125rem;
  overflow: hidden;
  height: 100%;
  max-width: 100%;
`;

export const Logo = styled.img<TWidth>(
  ({ $width }) => css`
    max-width: 100%;
    height: 100%;

    &&& {
      width: ${$width};
    }
  `,
);

export const EditLogo = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    left: -0.1rem;
    top: -0.4rem;
    width: 1.625rem;
    height: 1.625rem;
    border-radius: 50%;
    background-color: ${colors.white};
    box-shadow: 0 0.25rem 0.25rem ${transparentize(0.75, colors.shadow)};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg g {
      stroke: ${colors.grey};
    }
  `,
);
