import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const ViewTogglerWrapper = styled.div(
  ({ theme: { colors }, view }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 6.75rem;
    padding: 2px;
    background: ${colors.greyF3};
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;

    &::before {
      position: absolute;
      width: 3.5rem;
      height: 2.3rem;
      background: ${colors.white};
      border-radius: 2px;

      box-shadow: ${view === 'tile' ? '-2px' : '2px'} 0 4px 0 ${transparentize(0.9, colors.black)};
      transform: translateX(${view === 'tile' ? '3rem' : '0'});
      transition: transform 300ms;
      content: '';
    }
  `,
);

export const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 2.3rem;
  padding: 0 0.8rem;
  z-index: 1;
`;
