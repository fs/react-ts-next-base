import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const Wrapper = styled.div(
  ({ theme: { colors, heightBreakpoints, down }, isSidebarOpened }) => css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 21.5rem;
    height: 100%;
    padding: 3rem 2rem;
    background: ${colors.white};
    z-index: ${isSidebarOpened ? 20 : 0};
    text-align: center;
    transform: translateX(${isSidebarOpened ? 0 : '22rem'});
    transition: transform 0.3s linear, z-index ${!isSidebarOpened ? '0.7s' : '0s'} linear;
    box-shadow: -0.25rem 0 0.25rem ${transparentize(0.9, colors.shadow)};
    overflow: hidden;

    ${down(heightBreakpoints.xs, true)} {
      padding: 1rem;
    }
  `,
);

export const Profile = styled.div(
  ({ theme: { colors, heightBreakpoints, down } }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 0 0 2rem;
    height: 17rem;

    &::after {
      display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 2.5rem;
      border-bottom: 3px solid ${colors.lightGreen};
      content: '';
      transform: translateX(-50%);
    }

    ${down(heightBreakpoints.xs, true)} {
      height: 14rem;
      padding: 0 0 1rem;
    }
  `,
);

export const ImageWrapper = styled.div`
  width: 6.5rem;
  height: 6.5rem;
`;

export const Name = styled.span`
  font-size: 1rem;
  margin: 0 0 0.3rem;
  line-height: 1.2rem;
`;

export const Company = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
`;

export const Status = styled.span(
  ({ theme: { colors } }) => css`
    color: ${transparentize(0.3, colors.black)};
    font-size: 0.75rem;
    line-height: 1rem;
  `,
);

export const Links = styled.div(
  ({ theme: { heightBreakpoints, down, between }, items, isSidebarSettingsActive }) => css`
    display: flex;
    flex-direction: column;
    align-items: ${isSidebarSettingsActive ? 'flex-end' : 'center'};
    justify-content: space-between;
    margin-top: 2.75rem;
    max-height: ${items * 2}rem;
    flex: 1;

    ${between(heightBreakpoints.sm, heightBreakpoints.md, true)} {
      margin-top: ${items > 8 && '1rem'};
    }

    ${between(heightBreakpoints.xs, heightBreakpoints.sm, true)} {
      margin-top: 1rem;
    }

    ${down(heightBreakpoints.xs, true)} {
      margin-top: ${items < 8 ? '1rem' : '0.35rem'};
    }
  `,
);

export const AdditionalMenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.75rem;
  align-items: flex-end;
`;

export const MenuTitle = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.blue};
  `,
);

export const AdditionalMenuTitle = styled.div(
  ({ theme: { heightBreakpoints, down, between, colors } }) => css`
    margin-top: 5.5rem;
    margin-bottom: 2rem;
    color: ${colors.blue};

    ${between(heightBreakpoints.sm, heightBreakpoints.md, true)} {
      margin-top: 3rem;
      margin-bottom: 1rem;
    }

    ${between(heightBreakpoints.xs, heightBreakpoints.sm, true)} {
      margin-top: 2rem;
      margin-bottom: 1rem;
    }

    ${down(heightBreakpoints.xs, true)} {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  `,
);

export const MenuLink = styled.span(
  ({ theme: { colors } }) => css`
    a,
    button {
      font: inherit;
      display: block;
      color: ${colors.black};
      font-size: 0.875rem;
      background: none;
      border: 0;
      outline: none;
    }
  `,
);

export const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

export const Row = styled.div(
  ({ isSidebarSettingsActive }) => css`
    display: flex;
    flex-direction: column;
    align-items: ${isSidebarSettingsActive ? 'flex-end' : 'center'};
    flex: 1;
  `,
);

export const RowFooter = styled.div(
  ({ theme: { heightBreakpoints, down }, isSidebarSettingsActive }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 1.5rem 0 0;
    height: ${isSidebarSettingsActive ? 'auto' : '8.5rem'};

    ${down(heightBreakpoints.xs, true)} {
      margin: 1rem 0 0;
      height: 6.5rem;
    }
  `,
);

export const SettingsLink = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 4.5rem;
    color: ${colors.blue};
    cursor: pointer;
    font-size: 0.875rem;
    text-align: center;
    margin: 0.5rem 0 0;
  `,
);
