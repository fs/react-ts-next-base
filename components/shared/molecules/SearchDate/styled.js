import styled, { css } from 'styled-components';

export const DateFilterForm = styled.div`
  display: flex;
  height: 2.5rem;
`;

export const FieldWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    width: 10rem;
    margin-right: 0.5rem;

    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);
