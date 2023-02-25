import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  padding: 2rem 3.5rem;
`;

export const Title = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.blue00};
    font-size: 0.875rem;
    font-weight: bold;
    margin: 0 0 2.8rem;
  `,
);

export const AddressesList = styled.div`
  margin-top: 1.25rem;
  max-width: 42rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr));
  gap: 1.5rem;
`;

export const AddAddressButton = styled.span(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-width: 19rem;
    min-height: 12.25rem;
    color: ${colors.greyA3};
    border: 1px dashed ${colors.greyA3};
    border-radius: 0.75rem;
    font-size: 0.75rem;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
  `,
);
