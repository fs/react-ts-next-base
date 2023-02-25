import styled, { css } from 'styled-components';

export const PageContainer = styled.div(
  ({ theme: { colors, headerHeight } }) => css`
    position: relative;
    width: 100%;
    min-height: calc(100% - ${headerHeight});
    background: ${colors.white};
    display: flex;
    flex-direction: column;
  `,
);

export const TitleWrapper = styled.section`
  width: 100%;
  padding: 3.75rem 1.25rem 1.875rem;
  margin: 0 auto;
  text-align: center;
  flex-grow: 1;
`;

export const Header = styled.h1`
  margin: 0 0 1rem;
  font-size: 1rem;
`;

export const Description = styled.p`
  font-size: 1;
`;

export const Image = styled.div`
  width: 100%;
  margin: 3rem 0 2rem;
  height: 100%;
  background: url(${process.env.ASSET_HOST}/images/not_supported.png) center / contain no-repeat;
`;

export const PageMessageTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  line-height: 1.813rem;
  margin-bottom: 1.3rem;
`;
