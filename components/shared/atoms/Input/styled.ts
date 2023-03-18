import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';
import { getMarginStyles } from 'public/styles/config/margin';

import { FieldWrapperProps, InputWrapperProps } from './types';

export const FieldWrapper = styled.div(
  ({
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
      padding: 0.625rem 1rem;
      background-color: ${backgroundColor};
      text-align: ${textAlign};
      border: 0;

      ::placeholder {
        color: ${theme.colors.grey_300};
      }

      :disabled {
        background-color: ${theme.colors.grey_200};
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
    background-color: ${disabled ? theme.colors.grey_200 : backgroundColor};
    cursor: ${disabled && 'not-allowed'};
    height: 100%;

    border-radius: ${rounded && '0.375rem'};
    ${border};
  `,
);

export const ErrorWrapper = styled.div`
  position: absolute;
  width: 100%;
  color: ${theme.colors.red_500};
  font-size: 0.68rem;
  padding: 0.15rem 0 0 0.5rem;
  white-space: nowrap;
  text-align: end;
  direction: rtl;
`;

export const FieldLabel = styled.label(
  () => css`
    position: absolute;
    top: 0;
    left: 0.35rem;
    height: 1px;
    font-size: 0.7rem;
    line-height: 0;
    background-color: ${theme.colors.white};
    color: ${theme.colors.grey_500};
    padding: 0 0.35rem;
    z-index: 1;
  `,
);
