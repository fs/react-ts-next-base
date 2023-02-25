import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(var(--vh) * 100);
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const Content = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    min-height: calc(var(--vh) * 100 - ${headerHeight});
    background-color: ${colors.greyFO};
    display: flex;
  `,
);

export const PageContent = styled.div`
  margin: 0;
  width: calc(100% - 15.5rem);
`;

export const ContentWrapper = styled.div`
  padding: 1.5rem 2rem;
  position: relative;
`;
