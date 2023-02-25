import styled, { css } from 'styled-components';

export const StyledLink = styled.a(
  ({ theme: { colors } }) => css`
    color: ${colors.black};
    padding-right: 1rem;

    &:hover {
      text-decoration: underline;
    }
  `,
);

export const Header = styled.div(
  ({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.greyCC};
    padding: 2rem 2.5rem;
    margin: 0 0 2.5rem;
  `,
);

export const Amount = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.orange};
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 0 0.75rem;
  `,
);

export const Description = styled.div`
  font-size: 0.875rem;
`;

export const OrderDetailsWrapper = styled.div`
  padding: 0 1.25rem;
`;

export const Footer = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    border-top: 1px solid ${colors.greyCC};
    padding: 2rem 2.5rem;
    margin: 2.5rem 0 0;
    font-size: 0.875rem;
  `,
);
