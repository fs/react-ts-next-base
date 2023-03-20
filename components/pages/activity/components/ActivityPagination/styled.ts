import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const PageNumber = styled.span(
  ({ theme: { colors } }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    border-top: 2px solid ${colors.grey_300};
    border-bottom: 2px solid ${colors.grey_300};
    font-size: 1.1rem;
  `,
);
