import styled, { css } from 'styled-components';

export const Title = styled.h3`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: normal;
  margin: 0 0 1rem;
`;

export const InputWrapper = styled.div`
  max-width: 25rem;
  margin-bottom: 1.25rem;
`;

export const InputTitle = styled.h3(
  ({ theme: { colors } }) => css`
    color: ${colors.greyA3};
    font-size: 0.75rem;
    font-weight: normal;
    margin: 0 0 0.75rem;
  `,
);
