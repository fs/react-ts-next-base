import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';
import { StylesConfig } from 'react-select';
import { TWidth } from 'public/styles/config/width';
import { TOption, TStylesProps } from './types';

export const AllStatusesLabel = styled.div(
  ({ theme: { colors } }) => css`
    font-weight: bold;
    color: ${colors.blue};
  `,
);

export const StyledCheckbox = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    width: 1rem;
    min-width: 1rem;
    height: 1rem;
    margin-right: 0.8rem;
    border: 1px solid ${colors.greyA3};
    content: '';
  `,
);

export const Check = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    left: -1px;
    top: -1px;
    width: inherit;
    height: inherit;
    background-color: ${colors.blue};
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='9' viewBox='0 0 12 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 1.70733L10.8449 0.552246L5.51285 5.88431L1.9657 2.45422L0.810608 3.60931L5.48861 8.13292L5.53151 8.17582L5.53223 8.1751L5.533 8.17584L6.68809 7.02076L6.68732 7.02002L12 1.70733Z' fill='white'/%3E%3C/svg%3E%0A");
    background-position: center;
    background-repeat: no-repeat;
  `,
);

export const SelectWrapper = styled.div(
  ({ $width }: TWidth) => css`
    width: ${$width};
    min-width: ${$width};
  `,
);
// Styles for react-select
export const customSelectStyles = ({ backgroundColor }: TStylesProps): StylesConfig<TOption> => ({
  option: styles => ({
    ...styles,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    color: theme.colors.grey73,
    background: theme.colors.white,
    height: '2rem',
    fontSize: '0.75rem',
    padding: '0 1rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    '&:hover': {
      color: theme.colors.blue,
      background: theme.colors.greyF1,
      cursor: 'pointer',
    },
  }),

  control: (styles, { selectProps: { value }, menuIsOpen }) => ({
    ...styles,
    position: 'relative',
    padding: '0',
    minHeight: '2.5rem',
    borderColor: theme.colors.greyF1,
    boxShadow: 'none',
    fontSize: '0.75rem',
    backgroundColor:
      value && Array.isArray(value) && value?.length >= 2
        ? theme.colors.blue
        : theme.colors[backgroundColor],
    color:
      value && Array.isArray(value) && value?.length >= 2 ? theme.colors.greyF1 : theme.colors.blue,

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
      borderTop: menuIsOpen
        ? 'none'
        : `0.5rem solid ${
            value && Array.isArray(value) && value?.length >= 2
              ? theme.colors.white
              : theme.colors.blue
          }`,
      borderBottom: menuIsOpen
        ? `0.5rem solid ${
            value && Array.isArray(value) && value?.length >= 2
              ? theme.colors.white
              : theme.colors.blue
          }`
        : 'none',
    },
  }),

  input: () => ({
    color: 'transparent',
    height: 0,
  }),

  placeholder: (styles, { selectProps: { value } }) => ({
    ...styles,
    width: 'calc(100% - 2rem)',
    color:
      value && Array.isArray(value) && value?.length >= 2 ? theme.colors.white : theme.colors.blue,
    fontSize: '0.75rem',
    fontWeight: 'bold',
    paddingLeft: '1rem',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  menu: styles => ({
    ...styles,
    zIndex: '2',
    padding: '0',
    boxShadow: 'none',
    border: ` 1px solid ${theme.colors.greyF1}`,
    filter: `drop-shadow(1px 2px 6px rgba(25, 25, 27, 0.07))`,
  }),

  dropdownIndicator: () => ({
    display: 'none',
  }),

  indicatorSeparator: () => ({
    opacity: 'none',
  }),

  valueContainer: styles => ({ ...styles }),

  indicatorsContainer: () => ({
    display: 'none',
  }),

  multiValue: styles => ({
    ...styles,
    maxWidth: '100%',

    '&: hover': {
      '& > div:nth-of-type(2)': {
        background: theme.colors.grey,

        svg: {
          color: theme.colors.green,
        },
      },
    },
  }),
});
