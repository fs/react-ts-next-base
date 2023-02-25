import styled, { css } from 'styled-components';

export const AdministratorDetailsWrapper = styled.div`
  display: flex;
`;

export const AdminAvatarWrapper = styled.div`
  width: 12rem;
  margin-right: 3rem;
  display: flex;
  justify-content: center;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 6.15rem;
  height: 6.15rem;
`;

export const DetailsItem = styled.div`
  width: 17rem;

  &:not(:first-child) {
    margin-top: 1.25rem;
  }
`;

export const DetailsTitle = styled.div`
  font-size: 0.75rem;
  margin: 0 0 0.15rem 0.25rem;
`;

export const DetailsValue = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    height: 2.5rem;
    font-size: 0.75rem;
    background-color: ${colors.white};
    border: 1px solid ${colors.greyC4};
    border-radius: 0.375rem;
    padding: 0 0.5rem;
  `,
);
