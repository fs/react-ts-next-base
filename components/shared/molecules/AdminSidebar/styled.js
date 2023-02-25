import styled, { css } from 'styled-components';
import Link from 'next/link';

export const AdminSidebarWrapper = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: sticky;
    top: ${headerHeight};
    left: 0;
    height: calc(var(--vh) * 100 - ${headerHeight});
    padding: 2.5rem 1.75rem;
    width: 15.5rem;
    min-width: 15.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    background-color: ${colors.white};
    border-right: 1px solid ${colors.greyA4};
    overflow: auto;
  `,
);

export const StyledMenuLink = styled(Link)(
  ({ theme: { colors }, $isActive }) => css`
    font-size: 0.875rem;
    color: ${colors.black};
    font-weight: ${$isActive ? 'bold' : 'normal'};
    width: fit-content;
  `,
);
