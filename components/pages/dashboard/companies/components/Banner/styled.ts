import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    padding: 0.75rem;
    margin: 1rem 0;
    background-color: ${colors.blueEE};
    box-shadow: 0 0.25rem 0.25rem ${transparentize(0.8, colors.shadow)};
  `,
);

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-weight: 700;
  white-space: nowrap;
`;

export const Description = styled.div`
  margin-bottom: 0.5rem;
`;

export const Image = styled.img`
  margin-left: 0.5rem;
  max-height: 5.5rem;
  align-self: center;
`;
