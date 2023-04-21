import { FC } from 'react';

import { TActionLink } from './types';
import { StyledNextLink, StyledLink } from './styled';

const ActionLink: FC<TActionLink> = ({
  onClick,
  label,
  $size = 16,
  children,
  $color = 'blue_600',
  bold = false,
  href,
  ...props
}) => {
  if (href)
    return (
      <StyledNextLink
        $color={$color}
        onClick={onClick}
        $size={$size}
        $bold={bold}
        href={href}
        passHref
        {...props}
      >
        {label}
        {children}
      </StyledNextLink>
    );
  return (
    <StyledLink $color={$color} onClick={onClick} $size={$size} $bold={bold} {...props}>
      {label} {children}
    </StyledLink>
  );
};

export default ActionLink;
