import styled, { css } from 'styled-components';

export const HeaderWrapper = styled.header(
  ({ theme: { colors }, isLight }) => css`
    transition: all 0.5s;
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: ${isLight ? '4.5rem' : '7rem'};
    padding: ${isLight ? '0 2.87rem 0 1.68rem' : '0 2rem 0 4rem'};
    z-index: 5;
    background: ${isLight ? colors.white : 'transparent'};
    box-shadow: ${isLight ? '0px 4px 4px rgba(34, 73, 131, 0.1)' : 'none'};
  `,
);

export const MainLogo = styled.img(
  ({ isLight }) => css`
    cursor: pointer;
    transition: all 0.5s;
    width: ${isLight ? '210' : '248'}px;
    height: ${isLight ? '45' : '55'}px;
  `,
);

export const Links = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;
`;

export const Location = styled.a(
  ({ theme: { colors }, isLight }) => css`
    display: flex;
    align-items: center;
    margin-left: 3.75rem;

    color: ${isLight ? colors.black : colors.white};
    font-size: 0.875rem;
    font-weight: 700;

    :hover {
      text-decoration: underline;
    }
  `,
);

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.strong`
  font-size: 0.875rem;
  line-height: 1rem;
  text-align: end;
`;

export const Role = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: end;
`;

export const HeaderMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const UserActions = styled.div`
  display: flex;
  margin-right: 2rem;
  gap: 1.75rem;
`;

export const CartButtonWrapper = styled.div`
  position: relative;
  > a,
  button {
    overflow: visible;
  }
`;

export const MenuButton = styled.button(
  ({ theme: { colors }, isLight }) => css`
    border: 0;
    background: none;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    margin-left: 2rem;
    cursor: pointer;
    color: ${isLight ? colors.blue : colors.white};
    font-size: 0.875rem;
    font-weight: 600;
  `,
);

export const Line = styled.div(
  ({ theme: { colors } }) => css`
    border: 1px solid ${colors.grey};
    opacity: 0.2;
    height: 100%;
  `,
);

export const OrdersAmountWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    left: 1.2rem;
    bottom: -0.3rem;
    height: 1.5rem;
    width: 1.5rem;

    color: ${colors.white};
    background-color: ${colors.orange};
    border: 0.15rem ${colors.white} solid;
    border-radius: 50%;
    font-size: 0.7rem;
    font-weight: bold;
  `,
);
