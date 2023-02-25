import styled, { css } from 'styled-components';

export const TitleWrapper = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    padding: 1.5rem 2rem;
    background-color: ${colors.white};
  `,
);

export const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

export const TabsWrapper = styled.div(
  ({ theme: { colors } }) => css`
    ul {
      background-color: ${colors.white};
      padding-left: 2rem;
    }
  `,
);
