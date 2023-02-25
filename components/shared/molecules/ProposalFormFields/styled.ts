import styled, { css } from 'styled-components';

export const RadioWrapper = styled.div`
  margin: 0 0 1.5rem;
`;

export const RadioLabel = styled.h3`
  font-weight: normal;
  font-size: 0.875rem;
  margin: 0 0 0.75rem;
`;

export const Subtitle = styled.h2(
  ({ theme: { colors } }) => css`
    color: ${colors.blue00};
    font-size: 0.875rem;
    margin: 0 0 1rem;
  `,
);

export const ReturnRequiredWrapper = styled.div(
  ({ theme: { colors } }) => css`
    margin: 1.5rem 0;
    padding: 1.5rem 0 0;
    border-top: 1px solid ${colors.greyCC};
  `,
);

export const ReturnQuantity = styled.div`
  margin: 0 0 1.5rem;
`;

export const ReturnQuantityTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin: 0 0 1rem;
`;

export const InputTitle = styled.h3(
  ({ theme: { colors } }) => css`
    color: ${colors.greyA3};
    font-size: 0.75rem;
    font-weight: normal;
    margin: 0 0 0.75rem;
  `,
);

export const Warning = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    color: ${colors.orange};
    font-size: 0.75rem;
    max-width: 38rem;
    margin: 0 0 1rem;
  `,
);
