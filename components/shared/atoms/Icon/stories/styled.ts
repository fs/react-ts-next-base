import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  padding: 1rem;
`;

export const IconItem = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 10rem;
    padding-top: 1.25rem;
    padding-bottom: 0.5rem;

    border: 1px solid ${colors.grey_500};
  `,
);

export const IconDescription = styled.div`
  margin-top: 0.5rem;

  overflow-wrap: anywhere;
`;
