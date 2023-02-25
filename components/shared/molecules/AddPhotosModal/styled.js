import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  padding: 1.4rem 0.3rem 0.3rem;
`;

export const AddPhoto = styled.div(
  ({ theme: { colors } }) => css`
    position: relative;
    width: 30rem;
    height: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${colors.greyE6};
    border: 1px solid ${colors.greyCC};
    border-radius: 0.2rem;
  `,
);

export const Text = styled.div(
  ({ theme: { colors } }) => css`
    text-align: center;
    color: ${colors.grey};
    margin-top: 1rem;
  `,
);

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: ${({ noPhotos }) => (noPhotos ? 'center' : 'flex-end')};
  flex-direction: column;
  margin-top: 1rem;
  span {
    margin: 1rem 0 2rem;
    opacity: 0.5;
  }
`;
