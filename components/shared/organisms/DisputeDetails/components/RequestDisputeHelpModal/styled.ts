import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  min-height: 23rem;
`;

export const LeftColumn = styled.div(
  ({ theme: { colors } }) => css`
    background: ${colors.blue00};
    padding: 3.375rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  `,
);

export const RightColumn = styled.div`
  padding: 3.375rem 3.375rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 1rem;
    font-weight: bold;
    color: ${colors.blue00};
  `,
);

export const Description = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.75rem;
    font-weight: bold;
    margin-top: 1.3rem;
    width: 13.8rem;
    color: ${colors.white};
  `,
);

export const Text = styled.div`
  font-size: 0.75rem;
  margin-top: 2.5rem;
  max-width: 26.875rem;
`;

export const Logo = styled.img`
  cursor: pointer;
  transition: all 0.5s;
  width: 178px;
  height: 38px;
`;

export const Block = styled.div(
  ({ theme: { colors } }) => css`
    margin-bottom: 1rem;
    background: ${colors.lightGreen};
    height: 0.25rem;
    width: 2rem;
  `,
);
