import styled, { css } from 'styled-components';

import theme from 'public/styles/theme';

import { EPosition, TPositionProps, TSizeProps } from './types';

type TLabelProps = {
  // eslint-disable-next-line prettier/prettier
  positionVariant: `${EPosition}`;
  position: TPositionProps;
  $size: TSizeProps;
  checked: boolean;
};

type TCheckmarkProps = {
  position: TPositionProps;
  size: TSizeProps;
  checked: boolean;
};

type TInputProps = {
  position: TPositionProps;
  $size: string;
};

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 0 0.2rem;
  line-height: 1.7rem;
  width: fit-content;
  font-size: 0.9rem;
`;

const getCheckmarkStyles = ({ position, size, checked }: TCheckmarkProps) => {
  return css`
    display: block;
    width: ${size};
    min-width: ${size};
    height: ${size};
    margin-left: ${position.marginLeft};
    margin-right: ${position.marginRight};
    border: 1px solid ${checked ? theme.colors.blue_500 : theme.colors.grey_400};
    content: '';
    background-position: center;
    background-repeat: no-repeat;
    background-color: ${checked ? theme.colors.blue_500 : theme.colors.white};
    background-image: ${checked
      ? `url('data:image/svg+xml,%3Csvg viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M12 1.70733L10.8449 0.552246L5.51285 5.88431L1.9657 2.45422L0.810608 3.60931L5.48861 8.13292L5.53151 8.17582L5.53223 8.1751L5.533 8.17584L6.68809 7.02076L6.68732 7.02002L12 1.70733Z" fill="white"/%3E%3C/svg%3E%0A')`
      : 'none'};
  `;
};

export const Label = styled.label(
  ({ $size, positionVariant, position, checked }: TLabelProps) => css`
    display: flex;
    align-items: center;
    cursor: pointer;

    a {
      &:hover {
        text-decoration: underline;
      }
    }

    ${positionVariant === 'left' &&
    css`
      &::before {
        ${getCheckmarkStyles({ position, size: $size, checked })}
      }
    `}

    ${positionVariant === 'right' &&
    css`
      &::after {
        ${getCheckmarkStyles({ position, size: $size, checked })}
      }
    `}
  `,
);

export const Input = styled.input(
  ({ position, $size }: TInputProps) => css`
    position: absolute;
    left: ${position.left};
    right: ${position.right};
    width: ${$size};
    height: ${$size};
    cursor: pointer;
    opacity: 0;
    margin: 0;
  `,
);
