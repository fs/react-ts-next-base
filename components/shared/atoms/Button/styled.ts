import styled, { css } from 'styled-components';

import { getMarginStyles } from 'public/styles/config/margin';
import theme from 'public/styles/theme';

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
    transition: 0.2s all;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 0.875rem;
    cursor: pointer;
    font-family: 'Gilroy', sans-serif;
    font-weight: 600;

    width: ${$width};
    height: ${$size.height};
    padding: ${$size.padding};
    border-radius: ${$borderRadius};
    overflow: hidden;

    background-color: ${$backgroundColor.default};
    color: ${$isLoading ? theme.colors.transparent : $textColor.default};
    text-decoration: ${$textDecoration.default};
    border: ${$border.default};
    box-shadow: ${$boxShadow.default};
    ${getMarginStyles(props)}

    &:hover:not(:disabled) {
      background-color: ${$backgroundColor.hover};
      color: ${$textColor.hover};
      text-decoration: ${$textDecoration.hover};
      border: ${$border.hover};
      box-shadow: ${$boxShadow.hover};
    }

    &:focus {
      background-color: ${$backgroundColor.focused};
      color: ${$textColor.focused};
      text-decoration: ${$textDecoration.focused};
      border: ${$border.focused};
      box-shadow: ${$boxShadow.focused};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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
    width: 100%;
    height: 100%;
    background-color: ${backgroundColor.default};
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
);
