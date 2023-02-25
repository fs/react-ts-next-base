import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const AdminAvatarWrapper = styled.div`
  width: 12rem;
  margin-right: 3rem;
  display: flex;
  justify-content: center;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 6.15rem;
  height: 6.15rem;
`;

export const EditIconWrapper = styled.div(
  ({ theme: { colors } }) => css`
    background-color: ${colors.white};
    border-radius: 50%;
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
    width: 1.25rem;
    height: 1.25rem;
    box-shadow: 0px 0px 4px ${transparentize(0.7, colors.shadow)};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
  `,
);
