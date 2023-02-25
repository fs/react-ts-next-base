import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';
import Link from 'next/link';

export const StyledLink = styled(Link)<{
  $isActive?: boolean;
}>(
  ({ $isActive }) => css`
    display: flex;
    width: fit-content;
    align-items: center;
    white-space: nowrap;
    color: ${theme.colors.black};
    font-weight: ${$isActive ? '700' : '400'};
    cursor: ${$isActive ? 'default' : 'pointer'};
  `,
);

export const BreadcrumbsWrapper = styled.div(
  () => css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    row-gap: 0.25rem;
    column-gap: 1rem;
    margin-bottom: 1rem;
  `,
);
