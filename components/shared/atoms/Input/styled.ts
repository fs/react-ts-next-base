import styled, { css } from 'styled-components';

import { getMarginStyles } from 'public/styles/config/margin';
import theme from 'public/styles/theme';

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
      width: 100%;
      height: 100%;
      padding: 0.625rem 1rem;
      margin: 0;

      font-family: Gilroy, sans-serif;
      font-size: 0.875rem;
      color: ${textColor};
      text-align: ${textAlign};

      background-color: ${backgroundColor};
      border: 0;

      ::placeholder {
        color: ${theme.colors.grey_300};
      }

      :disabled {
        cursor: not-allowed;

        background-color: ${theme.colors.grey_200};
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
      appearance: none;

      margin: 0;
    }

    input[type='number'] {
      appearance: textfield;
    }
  `,
);

export const InputWrapper = styled.div(
  ({ rounded, border, backgroundColor, disabled }: InputWrapperProps) => css`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    height: 100%;
    overflow: hidden;

    cursor: ${disabled && 'not-allowed'};

    background-color: ${disabled ? theme.colors.grey_200 : backgroundColor};
    border-radius: ${rounded && '0.375rem'};
    ${border};
  `,
);

export const ErrorWrapper = styled.div`
  position: absolute;

  width: 100%;
  padding: 0.15rem 0 0 0.5rem;

  font-size: 0.68rem;
  color: ${theme.colors.red_500};
  text-align: end;
  white-space: nowrap;
  direction: rtl;
`;

export const FieldLabel = styled.label(
  () => css`
    position: absolute;
    top: 0;
    left: 0.35rem;
    z-index: 1;

    height: 1px;
    padding: 0 0.35rem;

    font-size: 0.7rem;
    line-height: 0;
    color: ${theme.colors.grey_500};

    background-color: ${theme.colors.white};
  `,
);
