import styled, { css } from 'styled-components';

export const ProductsWrapper = styled.div(
  ({ theme: { breakpoints, up }, view }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${view === 'tile' ? '15rem' : '38rem'}, 1fr));
    gap: 1rem;

    ${up(breakpoints.xxl)} {
      grid-template-columns: repeat(auto-fill, minmax(${view === 'tile' ? '24%' : '52rem'}, 1fr));
    }
  `,
);
