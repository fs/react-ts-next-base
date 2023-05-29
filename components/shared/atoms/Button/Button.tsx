import { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';

import Loader from 'components/shared/atoms/Loader';

import { SpinnerWrapper, StyledButton } from './styled';
import { TButton } from './types';
import {
  backgroundConfig,
  borderConfig,
  borderRadiusConfig,
  colorConfig,
  iconConfig,
  shadowConfig,
  sizeConfig,
  textDecorationConfig,
} from './config';

type TButtonType = TButton & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, TButtonType>(
  (
    {
      variant = 'primary',
      type = 'button',
      $width = 'auto',
      iconType = 'none',
      icon,
      size = 'medium',
      shape = 'none',
      label,
      testId,
      disabled = false,
      children,
      isLoading = false,
      href,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledButton
        type={type}
        data-testid={testId}
        ref={ref}
        $isLoading={isLoading}
        disabled={disabled}
        $width={$width}
        $backgroundColor={backgroundConfig[variant]}
        $textColor={colorConfig[variant]}
        $textDecoration={textDecorationConfig[variant]}
        $borderRadius={borderRadiusConfig[shape]}
        $border={borderConfig[variant]}
        $boxShadow={shadowConfig[variant]}
        $size={sizeConfig[size]}
        $iconType={iconType}
        $icon={iconConfig[iconType]}
        as={href ? Link : 'button'}
        href={href}
        passHref
        {...props}
      >
        {iconType === 'leading' && icon}
        {iconType === 'only' ? icon : label}
        {iconType === 'trailing' && icon}
        {children}
        {isLoading && (
          <SpinnerWrapper backgroundColor={backgroundConfig[variant]}>
            <Loader variant="simple" size={sizeConfig[size].loaderSize} />
          </SpinnerWrapper>
        )}
      </StyledButton>
    );
  },
);
export default Button;
