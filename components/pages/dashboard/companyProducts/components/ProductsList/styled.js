import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 100;
`;

export const ProductsListWrapper = styled.div(
  ({ isEmpty }) => css`
    padding: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: ${isEmpty ? 'center' : 'flex-start'};
  `,
);

export const CreateDraftWrapper = styled.div(
  ({ theme: { colors } }) => css`
    > a {
      width: 16.5rem;
      height: 100%;
      min-height: 26rem;
      flex-direction: column;
      box-shadow: 0 0 1rem ${transparentize(0.7, colors.shadow)};
    }
  `,
);

export const ProductCardWrapper = styled.div`
  width: 16.5rem;
`;

export const ButtonText = styled.span`
  padding-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: normal;
`;
