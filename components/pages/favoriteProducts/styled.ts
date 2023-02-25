import styled, { css } from 'styled-components';
import { TView } from 'public/styles/config/view';

export const PageWrapper = styled.span(
  ({ theme: { colors, contentWidth } }) => css`
    display: block;
    background-color: ${colors.white};
    max-width: ${contentWidth};
    width: 100%;
    padding: 2rem 2rem 3rem;
    height: fit-content;
  `,
);

export const Content = styled.div(
  ({ theme: { contentWidth } }) => css`
    max-width: ${contentWidth};
    width: 100%;
    padding: 4.5rem 2rem 3rem;
  `,
);

export const Header = styled.h1`
  margin: 0 0 1rem;
  font-size: 0.875rem;
`;

export const PageContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    min-height: calc(100% - ${headerHeight});
    background: ${colors.white};
  `,
);

export const ProductsWrapper = styled.div<TView>(
  ({ view }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${view === 'tile' ? '15rem' : '100%'}, 1fr));
    gap: 1rem;
  `,
);
