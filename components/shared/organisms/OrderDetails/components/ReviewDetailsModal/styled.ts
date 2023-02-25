import styled, { css } from 'styled-components';

export const Title = styled.h2`
  font-size: 1rem;
  padding: 1.75rem 1.75rem 0;
  margin: 0 0 1rem;
`;

export const CompanyWrapper = styled.div`
  display: flex;
  padding: 0 1.75rem 1rem;
`;

export const LogoWrapper = styled.div`
  height: 4.5rem;
`;

export const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 1rem;
`;

export const Row = styled.div`
  display: flex;
`;

export const UnofficialName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 1rem;
`;

export const OfficialName = styled.div`
  font-size: 0.875rem;
`;

export const ReviewContentWrapper = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    font-size: 0.875rem;
    padding: 1.75rem;
    border-top: 1px solid ${colors.greyCC};
  `,
);

export const ReviewTitle = styled.h3`
  font-size: 0.875rem;
  margin: 0 0 0.5rem;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 1.75rem 1.75rem;
`;
