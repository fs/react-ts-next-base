import styled, { css } from 'styled-components';

export const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0 0 1.5rem;
`;

export const Description = styled.div`
  font-size: 0.875rem;
  margin: 1.5rem 0;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 1.5rem 0 0;
  justify-content: flex-end;
`;

export const QuestionPhotosWrapper = styled.div`
  display: flex;
`;

export const DescriptionPhotos = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.75rem;
    margin-right: 2rem;
    min-width: max-content;

    > div:nth-child(2) {
      color: ${colors.greyCC};
    }
  `,
);

export const ListPhotos = styled.div`
  display: flex;
`;

export const AddPhotoButtonWrapper = styled.div`
  margin-right: 0.7rem;
`;
