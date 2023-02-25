import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import theme from 'public/styles/theme';
import { getMarginStyles } from 'public/styles/config/margin';

import { TDatePickerProps, TDatePickerFieldProps } from './types';

export const DatePickerTooltip = styled.div`
  z-index: 30;

  .react-datepicker {
    width: min-content;
    border-radius: 0;
    border: 0;
    box-shadow: 0 0 0.5rem ${transparentize(0.5, theme.colors.shadow)};
    padding: 2rem 1.25rem 1.5rem;
    font-family: 'Gilroy', sans-serif;

    &__triangle {
      display: none;
    }

    &__navigation {
      top: 1.65rem;
      z-index: 3;

      span::before {
        border-color: ${theme.colors.black};
        border-width: 2px 2px 0 0;
      }

      &--previous {
        left: 1.75rem;
      }

      &--next {
        right: 1.75rem;
      }
    }

    &__header {
      background-color: ${theme.colors.white};
      border: 0;
      padding: 0;
    }

    &__current-month {
      font-weight: normal;
      font-size: 1.1rem;
      margin: 0 0 0.75rem;
      text-transform: capitalize;
    }

    &__header__dropdown {
      margin: 0 0 0.5rem;

      select {
        padding: 0.1rem 0.3rem;
        font-family: Gilroy, sans-serif;
        text-transform: capitalize;
      }
    }

    &__month-dropdown-container {
      margin-right: 1rem;
    }

    &__day-names {
      text-transform: uppercase;
    }

    &__day-name {
      margin: 0.25rem;
    }

    &__day {
      border-radius: 50%;
      margin: 0.1rem;
      width: 2.2rem;
      height: 2.2rem;
      line-height: 2.2rem;

      &:hover {
        border-radius: 50%;
        background-color: ${transparentize(0.5, theme.colors.blue)};
      }

      &:nth-child(n + 6) {
        color: ${theme.colors.error};
      }

      &--selected {
        background-color: ${theme.colors.blue}80;
        color: ${theme.colors.black};
        font-weight: normal;
      }

      &--keyboard-selected {
        background-color: ${theme.colors.blue};
      }

      &--disabled {
        pointer-events: none;
        color: ${theme.colors.greyC4};

        &:nth-child(n + 6) {
          color: ${theme.colors.greyC4};
        }
      }
    }
  }
`;

export const DatePickerWrapper = styled.div(
  ({ variant, $width, border, size, ...props }: TDatePickerProps) => css`
    position: relative;

    border: ${border};
    width: ${variant === 'table-cell' ? '100%' : $width};
    height: ${variant === 'table-cell' ? '100%' : size.height};

    ${getMarginStyles(props)};
  `,
);

export const DatePickerField = styled.button(
  ({ empty }: TDatePickerFieldProps) => css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0 2rem 0 1rem;
    font-size: 0.875rem;
    background-color: ${theme.colors.white};
    color: ${empty && theme.colors.greyA4};
    z-index: 2;

    :disabled {
      background-color: ${theme.colors.greyFO};
      cursor: not-allowed;
    }
  `,
);

export const ActionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.35rem;
  border-top: 1px solid ${theme.colors.grey};
`;

export const CheckboxWrapper = styled.div`
  width: 100%;
  padding-left: 0.75rem;

  label {
    font-size: 0.875rem;
  }
`;

export const ClearButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0rem;
`;

export const ErrorWrapper = styled.div`
  position: absolute;
  width: fit-content;
  color: ${theme.colors.error};
  padding: 0.15rem 0 0 0.5rem;
  font-size: 0.68rem;
  white-space: nowrap;
`;
