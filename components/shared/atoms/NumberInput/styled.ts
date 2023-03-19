import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';
import { getMarginStyles } from 'public/styles/config/margin';
import { FieldWrapperProps } from './types';

export const FieldWrapper = styled.div(
  ({ textAlign, ...props }: FieldWrapperProps) => css`
    position: relative;
    width: 100%;
    height: 2.5rem;
    ${getMarginStyles(props)}

    input {
      width: 100%;
      margin: 0;
      border: 1px solid ${theme.colors.grey_500};
      padding: 0.625rem 1rem;
      height: 2.5rem;
      text-align: ${textAlign};
      font-size: 0.875rem;
      font-family: 'Gilroy', sans-serif;

      :disabled {
        background-color: ${theme.colors.grey_500};
        cursor: not-allowed;
      }

      ::placeholder {
        color: ${theme.colors.grey_400};
      }
    }
  `,
);

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    width: fit-content;
    top: 100%;
    color: ${colors.red_500};
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
    color: ${colors.grey_600};
    padding: 0 0.35rem;
    z-index: 1;
  `,
);
