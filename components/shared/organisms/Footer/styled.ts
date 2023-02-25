import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { colors, heightBreakpoints, down } }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 2.875rem 1rem 1.75rem;
    background: ${colors.blue};
    color: ${colors.white};

    ${down(heightBreakpoints.xs, true)} {
      padding: 1.5rem 1rem 1rem;
    }
  `,
);

export const Container = styled.div(
  ({ theme: { down, breakpoints } }) => css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 58rem;

    ${down(breakpoints.md)} {
      width: 40rem;
    }
  `,
);

export const Info = styled(Container)`
  align-items: center;
`;

export const MenuList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 33rem;
`;

export const MenuItem = styled.li(
  ({ theme: { breakpoints, heightBreakpoints, down, up } }) => css`
    flex: 0 auto;
    width: 49%;
    margin: 0 0 1.5rem;
    padding-right: 1rem;
    text-align: left;

    display: flex;

    ${up(breakpoints.md)} {
      white-space: nowrap;
    }

    ${down(heightBreakpoints.xs, true)} {
      margin: 0 0 1rem;
    }
  `,
);

export const Copy = styled.div`
  text-transform: uppercase;
`;

export const Contacts = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 15rem;

    a {
      color: ${colors.white};
      margin: 0 0 1.5rem;
    }
  `,
);

export const RequestHelpLink = styled.a`
  margin: 0 0 1.5rem;
`;
