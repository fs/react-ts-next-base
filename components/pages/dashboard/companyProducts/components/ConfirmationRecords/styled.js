import styled, { css } from 'styled-components';

export const ConfirmationRecordsWrapper = styled.div`
  position: relative;
`;

export const Title = styled.div`
  display: flex;
  font-size: 0.875rem;
  margin: 2rem 0 0.25rem;
`;

export const Description = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.75rem;
    color: ${colors.grey};
    margin: 0 0 0.75rem;
  `,
);

export const ConfirmationPhotosWrapper = styled.div`
  display: flex;
`;

export const AddPhotoButtonWrapper = styled.div`
  margin-right: 0.7rem;
`;

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    width: 100%;
    bottom: -1.25rem;
    font-size: 0.75rem;
    color: ${colors.error};
    padding: 0.15rem 0 0 0.5rem;
  `,
);

export const IconWrapper = styled.div`
  position: relative;
  margin-left: 0.75rem;
`;
