import styled, { css } from 'styled-components';

export const AdminItemWrapper = styled.div(
  ({ theme: { colors, breakpoints, down } }) => css`
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    border: 1px solid ${colors.greyCC};
    background-color: ${colors.white};
    width: 50rem;

    &:not(:first-child) {
      margin: 1rem 0 0;
    }

    ${down(breakpoints.lg)} {
      width: 100%;
      flex-direction: column;
    }
  `,
);

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 4.625rem;
  min-width: 4.625rem;
  height: 4.625rem;
  margin-right: 2rem;
`;

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 2rem;
  font-size: 0.875rem;
`;

export const Name = styled.strong`
  margin: 0 0 0.75rem;
`;

export const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 13rem;
  margin-right: 2rem;
`;

export const Contact = styled.div`
  display: flex;
  align-items: center;
`;

export const ActionsWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    > :not(:first-child) {
      margin: 1rem 0 0;
    }

    ${down(breakpoints.lg)} {
      flex-direction: row;

      &:not(:first-child) {
        margin: 1rem 0 0;
      }

      > :not(:first-child) {
        margin: 0 0 0 1rem;
      }
    }
  `,
);
