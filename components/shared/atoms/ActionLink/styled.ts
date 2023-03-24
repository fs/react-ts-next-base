import styled, { css } from 'styled-components';
import Link from 'next/link';

import { getMarginStyles } from 'public/styles/config/margin';
import { configColors } from 'public/styles/config/colors';
import { TStyledLinkProps } from './types';

const linkStyles = ({ $size, $color, $bold, ...props }: TStyledLinkProps) => css`
  text-decoration: none;
  font-size: ${$size}px;
  color: ${configColors[$color]};
  font-weight: ${$bold ? 'bold' : 'normal'};

  &:hover {
    text-decoration: underline;
  }

  ${getMarginStyles(props)};
`;

export const StyledNextLink = styled(Link)(linkStyles);

export const StyledLink = styled.a(linkStyles);
