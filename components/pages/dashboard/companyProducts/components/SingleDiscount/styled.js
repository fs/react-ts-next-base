import styled, { css } from 'styled-components';

export const Title = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0 0 0.35rem;
`;

export const DiscountsWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;

    &:not(:first-child) {
      padding: 1.5rem 0 0;

      ::before {
        position: absolute;
        left: 0;
        top: 0;
        content: ' ';
        width: 100%;
        border-top: 1px solid ${colors.greyCF};
      }
    }
  `,
);

export const Description = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.875rem;
    color: ${colors.greyA3};
    padding: 0 0 1.75rem;
  `,
);

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  margin: 0 0 1.25rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 11.5rem;
  max-height: 2.5rem;

  &:nth-child(n + 3) {
    margin-left: 1rem;
  }
`;
