import styled, { css } from 'styled-components';

export const Wrapper = styled.div(
  ({ theme: { colors } }) => css`
    width: 100%;
    padding: 2rem 1rem;
    border-bottom: 1px solid ${colors.greyCF};
  `,
);

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 2.5rem 1.5rem;
`;

export const Info = styled.div`
  display: flex;
`;

export const BlockingDate = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
`;

export const CompanyData = styled.div``;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0.7rem;
`;

export const Name = styled.h1`
  margin: 0 1rem 0 0;
  font-size: 1.5rem;
  text-transform: uppercase;
`;

export const Direction = styled.span(
  ({ theme: { colors } }) => css`
    display: flex;
    align-items: center;
    font-size: 0.875rem;

    strong {
      margin-left: 0.3rem;
    }

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

export const OfficialName = styled.div`
  margin-top: 0.7rem;
  font-size: 0.875rem;
`;

export const LogoWrapper = styled.div`
  height: 4.5rem;
  margin-right: 2rem;
  border-radius: 0.75rem;
  overflow: hidden;

  img {
    height: fit-content;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const Contacts = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1rem 2.5rem;
    border-top: 1px solid ${colors.greyCF};
  `,
);

export const ContactsItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3rem;
`;
