import styled, { css } from 'styled-components';

export const DeliveryWrapper = styled.div`
  &:not(:first-child) {
    margin-top: 3.375rem;
  }
`;

export const Subtitle = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.blue00};
    font-size: 0.875rem;
    font-weight: bold;
    margin: 0 0 0.75rem;
  `,
);

export const Description = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.75rem;
    color: ${colors.grey};
    margin: 0 0 1rem;
  `,
);

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export const PickupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: -1.5rem;

  > div:first-child {
    flex-shrink: 2;
  }

  > div:last-child {
    max-width: 22rem;
    margin: 0 0 0 1.3rem;
  }
`;
