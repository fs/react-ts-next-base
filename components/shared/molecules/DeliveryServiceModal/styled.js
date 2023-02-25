import styled, { css } from 'styled-components';

export const DeliveryServiceButton = styled.button`
  width: fit-content;
  background-color: transparent;
  padding: 0;
  border: 0;
`;

export const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 37.5rem;
`;

export const Title = styled.h1`
  font-size: 0.875rem;
  font-weight: bold;
  padding: 2rem 2.5rem;
  margin: 0;
`;

export const RadioDeliveryMethodsWrapper = styled.div(
  ({ theme: { colors } }) => css`
    padding: 0 2.5rem 2.5rem;
    border-bottom: 1px solid ${colors.greyCC};
  `,
);

export const ActionsWrapper = styled.div(
  ({ theme: { colors } }) => css`
    padding: 0.75rem 0.75rem 0.75rem 2rem;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid ${colors.greyCC};
  `,
);

export const Description = styled.span(
  ({ theme: { colors } }) => css`
    font-size: 0.75rem;
    color: ${colors.orange};
  `,
);
