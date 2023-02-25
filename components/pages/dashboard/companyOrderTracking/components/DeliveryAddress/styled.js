import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const DeliveryAddressWrapper = styled.div(
  ({ theme: { colors } }) => css`
    box-shadow: 0 0 0.375rem ${transparentize(0.8, colors.blue00)};
    font-size: 0.75rem;
    padding: 1.5rem 1.75rem;
  `,
);

export const Title = styled.h2`
  font-weight: bold;
  font-size: 0.875rem;
  margin: 0 0 0.75rem;
`;
