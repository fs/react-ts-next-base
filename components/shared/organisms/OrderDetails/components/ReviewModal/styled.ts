import styled, { css } from 'styled-components';

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  font-size: 0.75rem;
`;

export const ModalHeader = styled.h3`
  margin: 0 1.5rem 1.5rem;
  font-size: 1.125rem;
`;

export const CompanyInfo = styled.div`
  display: flex;
  margin: 1rem 0;
  padding: 0.875rem 1.5rem;
`;

export const ContentWrapper = styled.div(
  ({ theme: { colors } }) => css`
    margin: 0 0 1rem;
    padding: 0.875rem 1.5rem 0;
    border-top: 1px solid ${colors.greyA3};
  `,
);

export const LogoWrapper = styled.div`
  height: 3rem;
  margin-right: 1rem;
`;

export const CompanyName = styled.p`
  display: flex;
  flex-direction: column;
  margin: 0;
`;

export const OfficialName = styled.span`
  font-size: 0.875rem;
`;

export const CompanyRating = styled.div`
  margin-left: 1rem;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0.875rem 1.5rem;
`;

export const Notice = styled.div`
  display: flex;
  width: 16rem;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
`;

export const RatingWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 0 0 0.5rem;
`;

export const InputTitle = styled.div`
  display: block;
  margin: 0.8rem 0;
  font-size: 0.875rem;
`;

export const ErrorRating = styled.div(
  ({ theme: { colors } }) => css`
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 100%;
    font-size: 0.68rem;
    color: ${colors.error};
  `,
);
