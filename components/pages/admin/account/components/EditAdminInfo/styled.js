import styled, { css } from 'styled-components';

export const EditAdminInfoWrapper = styled.div(
  ({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.greyC4};
    margin: 0 0 2rem;
    padding: 0 0 2rem;
  `,
);

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div:not(:last-child) {
    margin-right: 1.25rem;
  }
`;
