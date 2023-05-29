import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 1rem;
`;

export const PageNumber = styled.span(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 1rem;

    font-size: 1.1rem;

    border-top: 2px solid ${colors.grey_300};
    border-bottom: 2px solid ${colors.grey_300};
  `,
);
