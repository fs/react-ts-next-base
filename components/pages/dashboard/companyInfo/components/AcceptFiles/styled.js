import styled, { css } from 'styled-components';

export const AcceptFilesTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: bold;
  padding: 1.4rem 2.7rem 1rem 0;
  margin: 0;
`;

export const AcceptFilesInfo = styled.p`
  font-size: 0.875rem;
  width: 95%;
  margin: 0 0 1.25rem;
`;

export const AcceptFilesCondition = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.75rem;
    color: ${colors.grey};
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;

    > div:not(:first-child) {
      margin: 0.75rem 0 0;
    }
  `,
);

export const AddFileWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LogoWrapper = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
`;

export const AddPhotoButtonWrapper = styled.div`
  margin-right: 1rem;
`;

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    font-size: 0.68rem;
    color: ${colors.error};
    padding: 0.8rem 0 0;
  `,
);
