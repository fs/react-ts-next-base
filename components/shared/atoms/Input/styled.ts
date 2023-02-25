import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';
import { getMarginStyles } from 'public/styles/config/margin';

import { FieldWrapperProps, ErrorWrapperProps, InputWrapperProps } from './types';

export const FieldWrapper = styled.div(
  ({
    padding,
    $width,
    inputHeight,
    type,
    backgroundColor,
    textAlign,
    textColor,
    ...props
  }: FieldWrapperProps) => css`
    position: relative;
    width: ${$width};
    height: ${type !== 'textarea' && inputHeight};
    ${getMarginStyles(props)}

    input,
    textarea {
      font-size: 0.875rem;
      font-family: 'Gilroy', sans-serif;
      color: ${textColor};
      width: 100%;
      height: 100%;
      margin: 0;
      padding: ${padding};
      background-color: ${backgroundColor};
      text-align: ${textAlign};
      border: 0;

      ::placeholder {
        color: ${theme.colors.greyA4};
      }

      :disabled {
        background-color: ${theme.colors.greyFO};
        cursor: not-allowed;
      }
    }

    textarea {
      height: 6.25rem;
      min-height: 3.5rem;
      resize: vertical;

      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }
  `,
);

export const InputWrapper = styled.div(
  ({ rounded, border, backgroundColor, disabled }: InputWrapperProps) => css`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    background-color: ${disabled ? theme.colors.greyFO : backgroundColor};
    cursor: ${disabled && 'not-allowed'};
    height: 100%;

    border-radius: ${rounded && '0.375rem'};
    ${border};
  `,
);

export const ErrorWrapper = styled.div(
  ({ padding }: ErrorWrapperProps) => css`
    position: absolute;
    width: 100%;
    color: ${theme.colors.error};
    font-size: 0.68rem;
    padding: ${padding};
    white-space: nowrap;
    text-align: end;
    direction: rtl;
  `,
);

export const FieldLabel = styled.label(
  () => css`
    position: absolute;
    top: 0;
    left: 0.35rem;
    height: 1px;
    font-size: 0.7rem;
    line-height: 0;
    background-color: ${theme.colors.white};
    color: ${theme.colors.grey};
    padding: 0 0.35rem;
    z-index: 1;
  `,
);
