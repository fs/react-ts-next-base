import Link from 'next/link';
import styled, { css } from 'styled-components';

import { configColors } from 'public/styles/config/colors';
import { getMarginStyles } from 'public/styles/config/margin';

import { TStyledLinkProps } from './types';

const linkStyles = ({ $size, $color, $bold, ...props }: TStyledLinkProps) => css`
  font-size: ${$size}px;
  font-weight: ${$bold ? 'bold' : 'normal'};
  color: ${configColors[$color]};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  ${getMarginStyles(props)};
`;

export const StyledNextLink = styled(Link)(linkStyles);

export const StyledLink = styled.a(linkStyles);
