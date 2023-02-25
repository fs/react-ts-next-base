import styled, { css } from 'styled-components';

export const TooltipWrapper = styled.button(
  ({ theme: { colors }, disabled }) => css`
    position: absolute;
    left: calc(100% + 1.2rem);
    top: calc(50% - 0.9rem);
    color: white;
    background: ${disabled ? colors.grey : colors.orange};
    border: none;
    padding: 10px;
    font-weight: bold;
    border-radius: 0.125rem;
    box-shadow: 0 0 0.4rem rgb(32 64 112 / 40%);
    white-space: nowrap;
    min-width: 7rem;
    display: flex;
    justify-content: center;

    &::before {
      display: block;
      position: absolute;
      top: 13px;
      left: -0.6rem;
      width: 0;
      height: 0;
      border: 0.4rem solid transparent;
      border-top: none;
      border-bottom: 0.5rem solid ${disabled ? colors.grey : colors.orange};
      transform: rotate(-90deg);
      content: '';
    }
  `,
);
