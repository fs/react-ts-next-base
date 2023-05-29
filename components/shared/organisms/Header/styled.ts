import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.header(
  ({ theme: { colors } }) => css`
    position: sticky;
    top: 0;
    z-index: 5;

    display: flex;
    justify-content: space-between;

    width: 100%;
    height: 80px;
    padding: 1rem;

    background-color: ${colors.white};
    border-bottom: 1px solid ${colors.grey_300};
  `,
);

export const Links = styled.div`
  display: flex;
  align-items: center;

  a {
    margin: 0 0.5rem;
  }
`;

export const StyledUserMenu = styled.ul(
  ({ theme: { colors } }) => css`
    position: absolute;
    top: 2.5rem;
    right: 0;
    left: auto;
    z-index: 1;

    display: block;

    width: 100%;
    min-width: 9.375rem;
    margin: 0;

    text-align: left;
    list-style-type: none;

    background-color: ${colors.white};
    filter: drop-shadow(0 0 3px ${colors.black});
    border: none;
    border-radius: 0.25rem;

    &::after {
      position: absolute;
      top: -0.3125rem;
      right: 50%;

      display: block;

      width: 0.625rem;
      height: 0.625rem;

      content: '';

      background-color: ${colors.white};

      transform: rotate(45deg);
    }
  `,
);

export const UserMenuItem = styled.li(
  ({ theme: { colors } }) => css`
    a,
    button {
      display: block;

      padding: 0.75rem 1.25rem;
      margin: 0;

      font-size: 1rem;
      line-height: 1;
      color: ${colors.black};
      text-align: left;

      cursor: pointer;

      background: none;
      border: none;

      &:hover,
      &:active,
      &:focus {
        color: ${colors.green_500};
      }
    }
  `,
);

export const UserName = styled.span(
  ({ theme: { colors, breakpoints } }) => css`
    display: inline-block;

    max-width: 10rem;
    margin: 0 0.3125rem 0 0.375rem;
    overflow: hidden;

    font-weight: 600;
    line-height: 1.1875rem;
    color: ${colors.black};
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: ${breakpoints.sm}) {
      display: none;
    }
  `,
);

export const UserNavigationWrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  cursor: pointer;
`;

export const UserNameWrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;

    padding-right: 1.25rem;

    outline: none;

    &::after {
      position: absolute;
      top: 50%;
      right: 0.3125rem;

      display: block;

      width: 0;
      height: 0;
      margin-top: 0;

      content: '';

      border: inset transparent;
      border-top: solid ${colors.black};
      border-bottom-width: 0;
    }
  `,
);

export const ImageWrapper = styled.div`
  width: 1.75rem;
  height: 1.75rem;
`;
