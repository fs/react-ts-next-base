import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  position: relative;
`;

export const ProductsWrapper = styled.div(
  ({ view }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${view === 'tile' ? '15rem' : '100%'}, 1fr));
    gap: 1rem;
  `,
);

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Count = styled.h2(
  ({ theme: { colors } }) => css`
    color: ${colors.greyA3};
    font-size: 0.8rem;
    font-weight: normal;
    margin: 0 0 2rem;
  `,
);
