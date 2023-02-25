import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const Image = styled.img(
  ({ theme: { breakpoints, down } }) => css`
    margin-top: 3rem;
    height: 15rem;

    ${down(breakpoints.md)} {
      height: 8.75rem;
    }
  `,
);

export const Title = styled.div`
  margin-top: 3.5rem;
  font-size: 1.45rem;
  font-weight: bold;
`;

export const Subtitle = styled.div`
  margin: 1.6rem 0 3rem;
  line-height: 1.4rem;
  text-align: center;
`;

export const Description = styled.div`
  margin: 3rem 0 0;
  text-align: center;
  line-height: 1.4rem;
`;

export const Warning = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0 0;
    color: ${colors.orange};
    font-weight: bold;
    text-align: center;
  `,
);

export const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 1.3rem;
  column-gap: 1.625rem;
`;
