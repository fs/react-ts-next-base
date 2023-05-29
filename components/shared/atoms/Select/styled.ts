import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { StylesConfig } from 'react-select';

import { getMarginStyles } from 'public/styles/config/margin';
import theme from 'public/styles/theme';

import { TFieldWrapperProps, TOption, TReactSelectProps } from './types';

export const FieldWrapper = styled.div(
  ({ isMulti, ...props }: TFieldWrapperProps) => css`
    position: relative;

    width: 100%;
    height: ${isMulti ? 'auto' : '2.5rem'};

    ${getMarginStyles(props)}
  `,
);

export const FieldLabel = styled.label(
  ({ theme: { colors } }) => css`
    position: absolute;
    top: 0;
    left: 0.35rem;
    z-index: 1;

    height: 1px;
    padding: 0 0.35rem;

    font-size: 0.7rem;
    line-height: 0;
    color: ${colors.grey_500};

    background-color: ${colors.white};
  `,
);

export const reactSelectStyles = <T>({
  height,
  rounded,
  readOnly,
}: TReactSelectProps): StylesConfig<TOption<T>> => ({
  placeholder: styles => ({
    ...styles,
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    color: theme.colors.grey_400,
  }),

  container: styles => ({
    ...styles,
    height: '100%',
  }),

  control: (styles, { menuIsOpen }) => ({
    ...styles,
    padding: '0 0 0 0.5rem',
    border: `1px solid ${theme.colors.grey_400}`,
    height: '100%',
    boxShadow: 'none',
    fontSize: '0.875rem',
    borderRadius: rounded ? '0.375rem' : '0',
    ...(readOnly && { backgroundColor: theme.colors.white }),

    '&:hover': {
      boxShadow: 'none',
    },

    '&::after': {
      position: 'absolute',
      top: '0.85rem',
      right: '0.6rem',
      width: 0,
      height: 0,
      border: '0.4rem solid transparent',
      borderTop: menuIsOpen ? 'none' : `0.5rem solid ${theme.colors.grey_500}`,
      borderBottom: menuIsOpen ? `0.5rem solid ${theme.colors.grey_500}` : 'none',
      content: "' '",
    },
  }),

  option: (styles, { isSelected, isDisabled, isFocused, isMulti }) => ({
    ...styles,
    fontSize: '0.875rem',
    cursor: 'pointer',
    backgroundColor:
      isSelected && !isMulti
        ? transparentize(0.4, theme.colors.blue_500)
        : isFocused && !isMulti
        ? transparentize(0.8, theme.colors.blue_500)
        : 'transparent',
    color: theme.colors.black,

    '&:hover': {
      backgroundColor:
        (!isDisabled &&
          (isSelected && !isMulti
            ? transparentize(0.4, theme.colors.blue_500)
            : transparentize(0.8, theme.colors.blue_500))) ||
        'transparent',
    },
  }),

  menuList: styles => ({
    ...styles,
    maxHeight: height,
    fontSize: '0.875rem',
  }),

  menu: styles => ({
    ...styles,
    zIndex: 2,
  }),

  indicatorsContainer: styles => ({
    ...styles,

    '> div:last-child': {
      opacity: '0',
    },
  }),

  singleValue: styles => {
    return {
      ...styles,
      maxWidth: ' calc(100% - 0.5rem)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      ...(readOnly && { color: theme.colors.black }),
    };
  },

  input: styles => {
    return {
      ...styles,
      visibility: 'visible',
    };
  },

  valueContainer: styles => ({
    ...styles,
  }),
});

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;

    width: 100%;
    padding: 0.15rem 0 0 0.5rem;

    font-size: 0.68rem;
    color: ${colors.red_500};
  `,
);

export const OptionWrapper = styled.div`
  > div {
    padding: 0;
  }
`;

export const CheckboxWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  div {
    font-size: 0.875rem;
    line-height: 1.7rem;
  }

  input {
    width: 100%;
    height: 100%;
    padding: 0 0.5rem;
    margin: 0;
  }

  label {
    margin-left: 1rem;
  }
`;
