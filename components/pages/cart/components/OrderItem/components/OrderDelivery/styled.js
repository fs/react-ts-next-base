import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const DeliveryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  min-width: 20rem;
`;

export const DeliveryDetails = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 0 auto;
    width: 100%;
    padding: 1rem;
    background: ${colors.white};
    box-shadow: 0 0 1rem ${transparentize(0.8, colors.blue00)};
  `,
);

export const DeliveryDate = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    padding: 1rem 1.5rem;
    background: ${colors.orange};
    color: ${colors.white};
    font-size: 0.75rem;
    font-weight: bold;
  `,
);

export const EditButton = styled.div(
  ({ theme: { colors }, disabled }) => css`
    display: flex;
    align-items: center;
    color: ${colors.orange};
    cursor: ${disabled ? 'default' : 'pointer'};
    opacity: ${disabled ? '0.4' : '1'};
    pointer-events: ${disabled && 'none'};
    font-size: 0.75rem;
  `,
);

export const DeliveryPrice = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.2rem;
  font-size: 0.7rem;

  strong {
    font-size: 0.875rem;
  }
`;

export const DeliveryAddress = styled.div`
  margin: 0 0 1.5rem;
  font-size: 0.75rem;
`;
