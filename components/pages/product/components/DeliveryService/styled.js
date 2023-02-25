import styled, { css } from 'styled-components';

export const StyledLink = styled.span(
  ({ theme: { colors }, disabled }) => css`
    color: ${colors.blue};
    font-weight: bold;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
    opacity: ${disabled && '0.3'};
    pointer-events: ${disabled && 'none'};

    &:hover {
      text-decoration: underline;
    }
  `,
);

export const DeliveryServiceLabel = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
`;
