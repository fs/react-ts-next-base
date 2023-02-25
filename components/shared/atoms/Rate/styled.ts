import styled, { css } from 'styled-components';

export const RateWrapper = styled.span(
  ({ theme: { colors } }) => css`
    color: ${colors.greyA3};
    font-weight: bold;
    font-size: 0.75rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      height: 0.75rem;
    }
  `,
);

export const RateText = styled.span`
  margin-left: 0.3rem;
`;
