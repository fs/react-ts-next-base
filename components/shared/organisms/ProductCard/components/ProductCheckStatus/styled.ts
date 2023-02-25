import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';

import { EProductStatus } from './types';

const color = (productStatus: EProductStatus) => {
  switch (productStatus) {
    case EProductStatus.checking:
      return theme.colors.orange;
    case EProductStatus.rejection:
    case EProductStatus.outOfStock:
      return theme.colors.error;
    case EProductStatus.draft:
      return theme.colors.blue;
    default:
      return theme.colors.orange;
  }
};

export const ProductCheck = styled.div<{ productStatus: EProductStatus }>(
  ({ productStatus }) => css`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    min-height: 2.75rem;
    background-color: ${color(productStatus)};
    display: flex;
    align-items: center;
    justify-content: ${[EProductStatus.checking, EProductStatus.draft].includes(productStatus)
      ? 'center'
      : 'flex-start'};
    padding: 0.3rem 0.2rem;
  `,
);

export const CheckText = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.white};
    font-size: 0.75rem;
    font-weight: bold;
    line-height: 1rem;
  `,
);
