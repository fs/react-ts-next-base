import styled, { css } from 'styled-components';

export const Description = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    color: ${colors.grey};
    font-size: 0.75rem;
    margin: 0 0 0.75rem;
  `,
);

export const AddFileWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
