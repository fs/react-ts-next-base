import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const DeletedItemWrapper = styled.div(
  ({ theme: { colors } }) => css`
    height: 3.5rem;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 4.5rem;
    margin: 1.4rem 0 0;
    font-weight: bold;
    box-shadow: 0 0 1rem ${transparentize(0.8, colors.blue00)};
  `,
);

export const ProductImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;

  img {
    height: 3.5rem;
    width: 3.5rem;
    object-fit: cover;
  }
`;

export const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.75rem;
`;
