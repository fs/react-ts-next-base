import styled, { css } from 'styled-components';

export const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Subtitle = styled.div`
  font-weight: bold;
  font-size: 0.875rem;
  margin: 1rem 0 0.75rem;
`;

export const SelectOption = styled.div(
  ({ theme: { colors } }) => css`
    background: ${colors.white};
    border-radius: 0.375rem;
    border: 1px solid ${colors.greyCC};
    margin-bottom: 0.5rem;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  `,
);
