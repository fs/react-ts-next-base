import React from 'react';

import { TActionLink } from './types';
import { StyledNextLink, StyledLink } from './styled';

const ActionLink: React.FunctionComponent<TActionLink> = ({
  onClick,
  label,
  size = 12,
  children,
  $color = 'blue',
  bold = false,
  href,
  ...props
}) => {
  if (href)
    return (
      <StyledNextLink
        $color={$color}
        onClick={onClick}
        $size={size}
        $bold={bold}
        href={href}
        passHref
        {...props}
      >
        {label} {children}
      </StyledNextLink>
    );
  return (
    <StyledLink $color={$color} onClick={onClick} $size={size} $bold={bold} {...props}>
      {label} {children}
    </StyledLink>
  );
};

export default ActionLink;
