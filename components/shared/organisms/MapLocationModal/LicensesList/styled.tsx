import styled, { css } from 'styled-components';

export const LicenseWrapper = styled.div`
  position: relative;
`;

export const LicenseTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0 1 auto;
  padding-bottom: 1rem;
`;

export const TextLicense = styled.span`
  margin-left: 1rem;
  font-size: 0.9rem;
`;

export const TextPhoto = styled.div<{
  isDisabled: boolean;
}>(
  ({ theme: { colors }, isDisabled }) => css`
    font-size: 1rem;
    margin-right: 1.5rem;
    color: ${isDisabled ? colors.grey : colors.black};
  `,
);

export const RemoveLicense = styled.div`
  position: absolute;
  right: 0;
  bottom: 0.5rem;

  > button {
    padding: 0;
  }
`;

export const AddPhoto = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: calc(100% - 10rem);
  margin: 0 0 1.5rem;
`;

export const AddPhotoButtonWrapper = styled.div`
  margin: 0 1rem 0;
`;
