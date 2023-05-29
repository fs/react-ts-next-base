import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';
import { getMarginStyles } from 'public/styles/config/margin';

import { TButtonProps, TSpinnerButtonProps } from './types';

export const StyledButton = styled.button(
  ({
    $backgroundColor,
    $textColor,
    $width,
    $iconType,
    $textDecoration,
    $size,
    $icon,
    $borderRadius,
    $border,
    $boxShadow,
    $isLoading,
    ...props
  }: TButtonProps) => css`
    position: relative;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: ${$width};
    height: ${$size.height};
    padding: ${$size.padding};
    overflow: hidden;

    font-family: Gilroy, sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${$isLoading ? theme.colors.transparent : $textColor.default};
    text-align: center;
    text-decoration: ${$textDecoration.default};

    cursor: pointer;

    background-color: ${$backgroundColor.default};
    border: ${$border.default};
    border-radius: ${$borderRadius};
    box-shadow: ${$boxShadow.default};

    transition: 0.2s all;
    ${getMarginStyles(props)}

    &:focus {
      color: ${$textColor.focused};
      text-decoration: ${$textDecoration.focused};

      background-color: ${$backgroundColor.focused};
      border: ${$border.focused};
      box-shadow: ${$boxShadow.focused};
    }

    &:disabled {
      cursor: not-allowed;

      opacity: 0.5;
    }

    &:hover:not(:disabled) {
      color: ${$textColor.hover};
      text-decoration: ${$textDecoration.hover};

      background-color: ${$backgroundColor.hover};
      border: ${$border.hover};
      box-shadow: ${$boxShadow.hover};
    }

    ${$iconType !== 'none' &&
    css`
      & svg {
        width: ${$size.iconSize};
        min-width: ${$size.iconSize};
        height: ${$size.iconSize};
        min-height: ${$size.iconSize};
        ${$icon.margin};
      }
    `}

    ${$iconType === 'only' &&
    css`
      width: ${$size.iconOnly.width};
      min-width: ${$size.iconOnly.width};
      height: ${$size.iconOnly.height};
      min-height: ${$size.iconOnly.height};
      padding: 0;

      & svg {
        width: ${$size.iconOnly.iconSize};
        min-width: ${$size.iconOnly.iconSize};
        height: ${$size.iconOnly.iconSize};
        min-height: ${$size.iconOnly.iconSize};
      }
    `}
  `,
);

export const SpinnerWrapper = styled.div(
  ({ backgroundColor }: TSpinnerButtonProps) => css`
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    background-color: ${backgroundColor.default};
  `,
);
