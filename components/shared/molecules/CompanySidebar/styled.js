import Link from 'next/link';
import styled, { css } from 'styled-components';

export const CompanyInfoWrapper = styled.div(
  ({ theme: { heightBreakpoints, down, between } }) => css`
    position: relative;
    padding: 0 0 2rem;
    font-weight: 200;
    margin: 2.8rem 0 0;

    ${between(heightBreakpoints.xs, heightBreakpoints.sm, true)} {
      padding: 0 0 1.25rem;
      margin: 1.5rem 0 0;
    }

    ${down(heightBreakpoints.xs, true)} {
      padding: 0 0 0.5rem;
      margin: 1.5rem 0 0;
    }
  `,
);

export const LogoWrapper = styled.div`
  height: 5.15rem;
`;

export const Name = styled.div(
  ({ theme: { colors, heightBreakpoints, down } }) => css`
    color: ${colors.white};
    font-size: 0.75rem;
    margin: 1rem 0 0;

    ${down(heightBreakpoints.xs, true)} {
      margin: 0.5rem 0 0;
    }
  `,
);

export const CompanyStatus = styled.ul(
  ({ theme: { colors } }) => css`
    color: ${colors.white};
    font-size: 0.75rem;
    margin: 0.3rem 0 0;
    padding-left: 1rem;
    list-style-type: disc;
  `,
);

export const MenuWrapper = styled.div(
  ({ theme: { heightBreakpoints, down, between } }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    font-weight: 200;
    gap: 0.6rem;

    ${between(heightBreakpoints.xs, heightBreakpoints.md, true)} {
      gap: 0.4rem;
    }

    ${down(heightBreakpoints.xs, true)} {
      gap: 0;
    }
  `,
);

export const StyledMenuLink = styled(Link)(
  ({ theme: { colors }, $isActive }) => css`
    color: ${colors.white};
    font-size: 0.75rem;
    line-height: 1.125rem;
    width: fit-content;
    font-weight: ${$isActive ? 'bold' : 'normal'};
    cursor: pointer;
  `,
);
