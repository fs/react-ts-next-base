import styled, { css } from 'styled-components';
import Link from 'next/link';

import theme from 'public/styles/theme';

import { TLinkProps } from './types';

export const StyledLink = styled(Link)(
  ({ fontStyle, color }: TLinkProps) => css`
    display: flex;
    cursor: pointer;
    width: fit-content;
    align-items: center;
    white-space: nowrap;
    font-size: ${fontStyle.size};
    color: ${theme.colors[color]};
    font-weight: ${fontStyle.fontWeight};
  `,
);
