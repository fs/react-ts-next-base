import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    min-height: 100%;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
  `,
);
export const ContentWrapper = styled.div(
  ({ theme: { down, between, breakpoints } }) => css`
    padding: 1rem 2.5rem 0;
    margin: 0 auto;
    width: 72rem;
    height: 100%;

    ${between(breakpoints.lg, breakpoints.xl)} {
      width: 68rem;
    }

    ${between(breakpoints.md, breakpoints.lg)} {
      width: 64rem;
    }

    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);

export const ContentTitleWrapper = styled(ContentWrapper)`
  padding: 0 2.5rem;
`;

export const PageTitleWrapper = styled.div`
  flex: none;
  width: 100%;
  height: 3rem;
  text-transform: uppercase;
  text-align: left;
  display: flex;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 1rem;
`;

export const CompanyItemWrapper = styled.div`
  margin: 1rem 0;
`;

export const BlackListCompaniesWrapper = styled.div`
  height: 100%;
`;

export const HighRatingCompaniesWrapper = styled.div`
  height: 100%;
`;
