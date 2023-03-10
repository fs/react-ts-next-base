import styled, { css } from 'styled-components';
import { TPositionProps, TStateProps, EPosition, TSizeProps } from './types';

type TLabelProps = {
  // eslint-disable-next-line prettier/prettier
  positionVariant: `${EPosition}`;
  position: TPositionProps;
  state: TStateProps;
  $size: TSizeProps;
};

type TCheckmarkProps = {
  position: TPositionProps;
  state: TStateProps;
  size: TSizeProps;
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

const getCheckmarkStyles = ({ state: checkmark, position, size }: TCheckmarkProps) => {
  const { borderColor, backgroundColor, backgroundImage } = checkmark;
  return css`
    display: block;
    width: ${size};
    min-width: ${size};
    height: ${size};
    margin-left: ${position.marginLeft};
    margin-right: ${position.marginRight};
    border: 1px solid ${borderColor};
    content: '';
    background-position: center;
    background-repeat: no-repeat;
    background-color: ${backgroundColor};
    background-image: ${backgroundImage ? `url('${backgroundImage}')` : 'none'};
  `;
};

export const Label = styled.label(
  ({ $size, positionVariant, position, state }: TLabelProps) => css`
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
        ${getCheckmarkStyles({ state, position, size: $size })}
      }
    `}

    ${positionVariant === 'right' &&
    css`
      &::after {
        ${getCheckmarkStyles({ state, position, size: $size })}
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
