import { ColorKeys } from 'public/styles/config/colors';
import styled, { css } from 'styled-components';

export const Slide = styled.div<{ color: ColorKeys }>(
  ({ theme: { colors }, color }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12rem;
    height: 12rem;
    background-color: ${colors[color]};
  `,
);

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
