import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';
import { TTabStyleProps, TTabListStyleProps } from './types';

export const TabsWrapper = styled.div`
  width: 100%;
`;

export const TabList = styled.ul(
  ({ gap }: TTabListStyleProps) => css`
    display: flex;
    width: 100%;
    column-gap: ${gap};
    flex-wrap: wrap;
  `,
);

export const TabsContent = styled.div`
  padding: 0;
`;

export const StyledTab = styled.li(
  ({
    isActive,
    border,
    textSize,
    textColor,
    fontWeight,
    flexPosition,
    backgroundColor,
    withRightDelimiter,
  }: TTabStyleProps) => css`
    flex: ${flexPosition};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
    position: relative;
    font-size: ${textSize};
    padding: 1rem 0.7rem;
    font-weight: ${isActive ? fontWeight.active : fontWeight.inactive};
    color: ${isActive ? textColor.active : textColor.inactive};
    background: ${isActive ? backgroundColor.active : backgroundColor.inactive};

    transition: color 0.5s;
    transition: border-bottom-color 0.5s;

    &::after {
      content: '';
      position: absolute;
      display: ${withRightDelimiter ? 'block' : 'none'};
      width: 0;
      border-left: 1px solid ${theme.colors.greyCC};
      right: 0;
      top: calc(50% + 3px / 2);
      transform: translateY(-50%);
      height: 80%;
    }

    ${isActive ? border.active : border.inactive}
  `,
);
