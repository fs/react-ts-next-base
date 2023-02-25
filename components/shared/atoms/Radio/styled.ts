import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';
import { TWrapperProps, TLabelProps } from './types';

export const RadioWrapper = styled.div(
  ({ direction }: TWrapperProps) => css`
    display: flex;
    flex-direction: ${direction};
    font-size: 0.875rem;
    flex-wrap: wrap;
    column-gap: 3rem;
    row-gap: 0.5rem;
  `,
);

export const Label = styled.label(
  ({ isChecked, disabled, boldSelectedValue }: TLabelProps) => css`
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: ${boldSelectedValue && isChecked ? 'bold' : 'normal'};

    input {
      position: absolute;
      left: 0;
      width: 1rem;
      height: 1rem;
      cursor: pointer;
      opacity: 0;
      margin: 0;
    }

    &::before {
      display: block;
      width: 1rem;
      min-width: 1rem;
      height: 1rem;
      margin-right: 0.8rem;
      border: ${isChecked ? `4px solid ${theme.colors.blue}` : `1px solid ${theme.colors.greyA3}`};
      border-radius: 50%;
      box-sizing: border-box;
      content: '';
    }

    ${disabled &&
    css`
      color: ${theme.colors.greyCC};
      cursor: default;

      > input {
        cursor: default;
      }

      &::before {
        border: 1px solid ${theme.colors.greyCC};
      }
    `}
  `,
);
