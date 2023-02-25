import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    padding: 1.5rem 2rem;
    margin: -1.5rem -2rem;
    min-height: 100%;
    background-color: ${colors.white};
  `,
);

export const ContentWrapper = styled.div`
  position: relative;
  max-width: 65rem;
`;
