import styled, { css } from 'styled-components';

export const AddLogoCompanyWrapper = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
  align-items: center;

  > span {
    width: min-content;
    margin-right: 1rem;
  }
`;

export const AddPhotoButtonWrapper = styled.div`
  margin: 0 1rem 0;
`;

export const LogoWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 0;
  width: 4.5rem;
  height: 4.5rem;
`;

export const ErrorWrapper = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    width: 100%;
    bottom: -1rem;
    font-size: 0.68rem;
    color: ${colors.error};
    padding: 0.15rem 0 0 0.5rem;
  `,
);
