import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  () => css`
    position: relative;
    min-height: 100%;
  `,
);

export const ContentWrapper = styled.div`
  position: relative;
  margin-left: 1rem;
  max-width: 60rem;
`;

export const BreadcrumbsWrapper = styled.div`
  position: relative;
  max-width: 65rem;
  padding: 0 1rem 2rem 0;
`;
