import styled, { css } from 'styled-components';

export const Header = styled.div(
  () => css`
    width: 100%;
    padding: 0 2rem 1.5rem 0;
  `,
);

export const ContentWrapper = styled.div`
  padding: 0 3rem 1.5rem 2rem;
  max-width: 50.5rem;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
