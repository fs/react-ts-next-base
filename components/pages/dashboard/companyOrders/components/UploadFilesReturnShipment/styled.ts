import styled, { css } from 'styled-components';

export const AddFileWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    font-size: 0.68rem;
    color: ${colors.error};
    padding: 0.8rem 0 0;
  `,
);

export const UploadFilesDescription = styled.div(
  ({ theme: { colors } }) => css`
    font-size: 0.75rem;
    color: ${colors.greyA4};
    margin: 1rem 0 1.5rem;

    > div:first-child {
      margin: 0 0 0.75rem;
    }
  `,
);
