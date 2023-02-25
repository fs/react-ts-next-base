import styled, { css } from 'styled-components';

export const RadioWrapper = styled.div`
  margin: 0 0 1.5rem;
`;

export const Subscription = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.75rem;
    color: ${colors.greyA3};
    margin-top: 0.75rem;
  `,
);

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  column-gap: 1rem;
`;
