import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors, contentWidth } }) => css`
    display: flex;
    margin: 0 auto;
    max-width: ${contentWidth};
    min-height: inherit;
    background-color: ${colors.white};
  `,
);

export const Sidebar = styled.div(
  ({ theme: { colors, headerHeight, sidebarWidth } }) => css`
    position: sticky;
    width: ${sidebarWidth};
    min-width: ${sidebarWidth};
    top: ${headerHeight};
    height: calc(var(--vh) * 100 - ${headerHeight});
    background-color: ${colors.blue00};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.875rem 2rem 2rem;
  `,
);

export const HelpWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const MainContent = styled.div(
  ({ theme: { sidebarWidth } }) => css`
    display: flex;
    flex-direction: column;
    width: calc(100% - ${sidebarWidth});
    min-height: inherit;
    position: relative;
  `,
);
