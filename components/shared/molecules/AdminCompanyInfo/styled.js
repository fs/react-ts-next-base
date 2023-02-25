import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const AdminCompanyInfoWrapper = styled.div(
  ({ theme: { colors, breakpoints, down }, hasShadow }) => css`
    display: flex;
    justify-content: space-between;
    width: 99%;
    max-width: 75rem;
    padding: 1.5rem;
    background-color: ${colors.white};
    box-shadow: ${hasShadow && `0 0 0.4rem ${transparentize(0.8, colors.shadow)}`};

    ${down(breakpoints.lg)} {
      flex-direction: column;
    }
  `,
);

export const RowDetails = styled.div`
  display: flex;
`;

export const RowContacts = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    justify-content: space-between;

    ${down(breakpoints.xl)} {
      flex-direction: column;
      align-items: flex-end;
    }

    ${down(breakpoints.lg)} {
      margin: 1rem 0 0;
    }
  `,
);

export const Timer = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${colors.orange};
    font-weight: bold;
    font-size: 0.875rem;
    margin-right: 3rem;
  `,
);

export const CompanyDetails = styled.div`
  display: flex;
  align-items: center;
  max-width: 30rem;
`;

export const LogoWrapper = styled.div`
  height: 4.5rem;
  margin-right: 2.5rem;
`;

export const Col = styled.div(
  ({ theme: { breakpoints, between } }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    ${between(breakpoints.lg, breakpoints.xl)} {
      justify-content: flex-start;
      height: auto;
    }
  `,
);

export const Name = styled.h2`
  text-transform: uppercase;
  font-size: 1.5rem;
  margin: 0 0 0.35rem;
`;

export const RegisteredAt = styled.div`
  font-size: 0.875rem;
`;

export const Direction = styled.span(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    margin: 0.35rem 0;

    &::before {
      display: block;
      vertical-align: middle;
      width: 6px;
      height: 6px;
      margin-right: 0.4rem;
      background: ${colors.green};
      border-radius: 6px;
      content: '';
    }
  `,
);

export const OfficialName = styled.strong`
  font-size: 0.875rem;
  margin: 0.35rem 0 0;
`;

export const Contacts = styled.div(
  ({ theme: { breakpoints, up } }) => css`
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 0 0.75rem;

    ${up(breakpoints.lg)} {
      flex-direction: column;
      height: 100%;
      width: auto;
    }
  `,
);

export const ContactsItem = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    width: 18rem;
    margin: 0 0 0.35rem 1.5rem;

    ${down(breakpoints.lg)} {
      width: auto;
      margin: 0 1rem 0.35rem 0;
    }
  `,
);

export const ActionWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 1.5rem;
`;
