import styled, { css } from 'styled-components';

export const MobileFooterWrapper = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    display: flex;
    background-color: ${colors.blue};
    padding: 1.5rem 2rem;
    gap: 1.25rem;
  `,
);

export const UnavailableImage = styled.img`
  width: 9rem;
`;

export const TextWrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    font-weight: 600;
    color: ${colors.white};
  `,
);
