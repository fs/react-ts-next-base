import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: calc(100% - ${headerHeight});
    background: ${colors.white};
  `,
);
export const InfinityContent = styled.div(
  () => css`
    padding: 0 0.2rem;
  `,
);
export const SubHeader = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    justify-content: center;
    background-color: ${colors.blue};
    width: 100%;
  `,
);

export const Title = styled.div(
  ({ theme: { colors, contentWidth } }) => css`
    font-size: 1.5rem;
    color: ${colors.white};
    text-transform: uppercase;
    font-weight: bold;
    width: ${contentWidth};
    max-width: ${contentWidth};
    padding: 1rem 2rem;
  `,
);

export const Content = styled.div(
  ({ theme: { contentWidth } }) => css`
    width: 100%;
    max-width: ${contentWidth};
    padding: 1.5rem 1.8rem;
  `,
);

export const CompaniesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(333px, 1fr));
  gap: 2rem;
  margin: 1rem 0;
`;
