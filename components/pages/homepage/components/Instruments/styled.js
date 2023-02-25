import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors } }) => css`
    overflow: auto;
    width: 100%;
    height: 100%;
    background-color: ${colors.greyF1};
    padding: 2rem 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  `,
);

export const ContentWrapper = styled.div(
  ({ theme: { breakpoints, down, between } }) => css`
    height: auto;
    margin: auto;
    text-align: left;
    width: 65rem;
    padding: 0 2.5rem;

    ${between(breakpoints.md, breakpoints.xl)} {
      width: 62rem;
    }

    ${down(breakpoints.md)} {
      width: 100%;
    }
  `,
);

export const Title = styled.h2`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

export const InstrumentsList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div {
    margin: 0.6rem;
  }
`;

export const SectionList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;
