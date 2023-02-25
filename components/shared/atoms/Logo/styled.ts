import styled, { css } from 'styled-components';
import Link from 'next/link';

import TextLogoIcon from 'public/images/text-logo.svg';

import { TLogo } from './types';

export const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  height: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

export const MainLogo = styled.img<TLogo>(
  ({ isLight }) => css`
    margin-left: 1.25rem;
    transition: all 0.5s;
    width: ${isLight ? 47 : 52}px;
    height: ${isLight ? 31 : 34}px;
  `,
);

export const TextLogoWrapper = styled.span<TLogo>(
  ({ theme: { colors }, isLight }) => css`
    margin-left: 1.25rem;
    margin-top: 0.3rem;
    svg {
      transition: all 0.5s;
      width: ${isLight ? 134 : 147}px;
      height: ${isLight ? 18 : 20}px;
    }
    path {
      transition: all 0.5s;
      fill: ${isLight ? colors.black : colors.white};
    }
  `,
);

export const TextLogo = styled(TextLogoIcon)``;
