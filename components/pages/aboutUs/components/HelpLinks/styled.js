import styled, { css } from 'styled-components';

export const HelpLinksWrapper = styled.div`
  min-width: 18rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-end;
`;

export const Header = styled.div(
  ({ theme: { colors } }) => css`
    text-align: right;
    font-weight: bold;
    text-transform: uppercase;
    color: ${colors.blue};
    border-right: 0.3rem solid ${colors.blue};
    padding: 0 0.5rem 0;
  `,
);

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const StyledLink = styled.a`
  width: fit-content;
  display: flex;
  justify-content: flex-end;
  margin: 1.25rem 0 0;
  cursor: pointer;
`;

export const StyledLinkText = styled.div`
  max-width: 13.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-align: right;
  margin: 0 1rem 0 0;
`;
