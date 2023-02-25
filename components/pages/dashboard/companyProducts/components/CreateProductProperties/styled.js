import styled, { css } from 'styled-components';

export const DescriptionTable = styled.div(
  ({ theme: { colors }, error }) => css`
    color: ${error ? colors.error : colors.grey};
    font-size: 0.75rem;
    margin-top: 0.5rem;
  `,
);

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Subtitle = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  padding-bottom: 1rem;
`;

export const QuantityKindWrapper = styled.div`
  width: 8rem;
  margin: 1rem 0;
`;
