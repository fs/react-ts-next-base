import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';
import { getMarginStyles } from 'public/styles/config/margin';
import { FieldWrapperProps } from './types';

export const FieldWrapper = styled.div(
  ({ textAlign, $height, border, padding, ...props }: FieldWrapperProps) => css`
    position: relative;
    width: 100%;
    height: ${$height};
    ${getMarginStyles(props)}

    input {
      width: 100%;
      margin: 0;
      ${border};
      ${padding};
      height: ${$height};
      text-align: ${textAlign};
      font-size: 0.875rem;
      font-family: 'Gilroy', sans-serif;

      :disabled {
        background-color: ${theme.colors.greyFO};
        cursor: not-allowed;
      }

      ::placeholder {
        color: ${theme.colors.greyA4};
      }
    }
  `,
);

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    width: fit-content;
    top: 100%;
    color: ${colors.error};
    padding: 0.15rem 0 0 0.5rem;
    font-size: 0.68rem;
    white-space: nowrap;
  `,
);

export const FieldLabel = styled.label(
  ({ theme: { colors } }) => css`
    position: absolute;
    top: 0;
    left: 0.35rem;
    height: 1px;
    font-size: 0.7rem;
    line-height: 0;
    background-color: ${colors.white};
    color: ${colors.grey};
    padding: 0 0.35rem;
    z-index: 1;
  `,
);
