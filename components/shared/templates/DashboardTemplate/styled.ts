import styled, { css } from 'styled-components';

export const WrapperUserInfo = styled.div(
  ({ theme: { heightBreakpoints, down } }) => css`
    height: 21rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    ${down(heightBreakpoints.xs, true)} {
      height: 17rem;
    }
  `,
);

export const BreadcrumbsWrapper = styled.div`
  position: absolute;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6rem 0 0;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 5.1rem;
  height: 5.1rem;
`;

export const UserName = styled.div(
  ({ theme: { colors } }) => css`
    margin-top: 2rem;
    color: ${colors.white};
    line-height: 1.2rem;
    font-size: 0.9rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    &::after {
      border: 1px solid ${colors.lightGreen};
      margin: 4.2rem auto 0;
      width: 2.5rem;
      content: '';
    }
  `,
);

export const SidebarContentWrapper = styled.div`
  margin-top: 4rem;
`;
