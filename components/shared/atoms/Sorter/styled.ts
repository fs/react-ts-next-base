import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';
import { TWidth } from 'public/styles/config/width';
import { StylesConfig } from 'react-select';

import { TOption, TSelectStyled } from './types';

// Styles for react-select
export const customSelectStyles = ({ backgroundColor }: TSelectStyled): StylesConfig<TOption> => ({
  option: styles => ({
    ...styles,
    position: 'relative',
    color: theme.colors.grey73,
    background: 'transparent',
    height: '2rem',
    fontSize: '0.75rem',
    paddingTop: '0.5rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    borderBottom: `1px solid ${theme.colors.greyF1}`,

    '&:hover': {
      color: theme.colors.blue,
      background: theme.colors.greyF1,
    },
  }),

  control: (styles, { menuIsOpen }) => ({
    ...styles,
    position: 'relative',
    padding: '0',
    minHeight: '2.5rem',
    borderColor: 'transparent',
    boxShadow: 'none',
    fontSize: '0.75rem',
    backgroundColor: theme.colors[backgroundColor],
    color: theme.colors.greyA3,

    '&:hover': {
      borderColor: 'transparent',
      boxShadow: 'none',
      cursor: 'pointer',
    },

    '&::after': {
      position: 'relative',
      display: 'inline-block',
      width: 0,
      height: 0,
      border: '5px solid transparent',
      content: "' '",
      top: menuIsOpen ? '-1px' : '1px',
      right: '1rem',
      borderTop: menuIsOpen ? 'none' : `8px solid ${theme.colors.blue}`,
      borderBottom: menuIsOpen ? `8px solid ${theme.colors.blue}` : 'none',
    },
  }),

  input: () => ({
    color: 'transparent',
    height: 0,
  }),

  menu: styles => ({
    ...styles,
    zIndex: 2,
  }),

  placeholder: (styles, { isDisabled }) => ({
    ...styles,
    width: 'calc(100% - 2rem)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: isDisabled ? theme.colors.grey : theme.colors.greyA4,
    fontSize: '0.75rem',
  }),

  dropdownIndicator: () => ({
    display: 'none',
  }),

  indicatorSeparator: () => ({
    opacity: 'none',
  }),

  singleValue: styles => ({
    ...styles,
    color: theme.colors.blue,
    fontWeight: 'bold',
    padding: '0 1.5rem 0 1rem',
    margin: 0,

    '&:focus': {
      color: 'red',
    },
  }),

  valueContainer: styles => ({ ...styles }),

  indicatorsContainer: () => ({
    display: 'none',
  }),
});

export const SorterWrapper = styled.div(
  ({ $width = '100%' }: TWidth) => css`
    width: ${$width};
    max-width: ${$width};
  `,
);
