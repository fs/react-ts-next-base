import styled, { css } from 'styled-components';

export const CategoryWrapper = styled.div(
  ({ theme: { colors } }) => css`
    max-width: 37.5rem;
    padding: 0.685rem;
    margin-bottom: 0.7rem;
    border: 1px solid ${colors.greyA4};
    background-color: ${colors.white};
  `,
);

export const CategoryGroup = styled.div`
  margin-left: 2rem;
`;

export const Title = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.625rem;
  justify-content: space-between;
`;

export const ActionsGroup = styled.div`
  display: flex;
  gap: 0.625rem;
`;
