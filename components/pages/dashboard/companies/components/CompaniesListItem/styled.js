import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const CompaniesListItemWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    width: 15.5rem;
    min-height: 26rem;
    box-shadow: 0 0 1rem ${transparentize(0.7, colors.shadow)};
    background-color: ${colors.white};
    margin: 1.8rem 0 0 1.8rem;
    display: flex;
    flex-flow: column;
  `,
);

export const CompanyPhoto = styled.div(
  ({ isVerified }) => css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    > div {
      height: ${isVerified ? '7rem' : '4rem'};
    }
  `,
);

export const CompanyInfo = styled.div(
  ({ theme: { colors } }) => css`
    min-height: 18rem;
    background-color: ${colors.blueEE};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 0.5rem 0.5rem 1.2rem;
    > strong,
    > span,
    > a {
      margin: 0.1rem 0;
      text-align: center;
    }
  `,
);

export const Line = styled.div(
  ({ theme: { colors } }) => css`
    border: 1px solid ${transparentize(0.7, colors.grey)};
    width: 3rem;
  `,
);

export const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 0 0.875rem;
`;
