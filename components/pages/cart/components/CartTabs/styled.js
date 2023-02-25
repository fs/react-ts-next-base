import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const OrderTabs = styled.div`
  width: 100%;
`;

export const Button = styled.div(
  ({ reverse, inactive }) => css`
    position: absolute;
    top: 0.5rem;
    left: ${reverse ? '0' : 'auto'};
    right: ${!reverse ? '0' : 'auto'};
    opacity: ${inactive ? '0.4' : '1'};
    cursor: ${inactive ? 'default' : 'pointer'};
    pointer-events: ${inactive ? 'none' : 'all'};
  `,
);

export const ScrolledWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CompanyItem = styled.div(
  ({ theme: { colors }, selected }) => css`
    min-width: 20%;
    padding: 0.5rem;
    background: ${selected ? colors.blue : colors.greyA3};
    border-left: 2px solid ${colors.white};
    color: ${colors.white};
    text-align: center;
    font-size: 0.75rem;
    cursor: ${selected ? 'default' : 'pointer'};
  `,
);
