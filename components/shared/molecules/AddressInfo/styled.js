import styled, { css } from 'styled-components';

import theme from 'public/styles/theme';
import { CompanyLocationStatusEnum } from 'graphql/types';

const color = (status, isAdminAddresses) => {
  switch (status) {
    case CompanyLocationStatusEnum.NotVerified:
      return theme.colors.orange;
    case CompanyLocationStatusEnum.Rejected:
      return isAdminAddresses ? theme.colors.orange : theme.colors.error;
    default:
      return theme.colors.grey;
  }
};

export const ItemWrapper = styled.div(
  ({ theme: { colors }, isMain, rounded, status, isAdminAddresses }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    min-width: 19rem;
    min-height: 14.875rem;
    box-shadow: inset 0 0 0 1px ${isMain ? colors.green : color(status, isAdminAddresses)};
    border-radius: ${rounded && '0.75rem'};
    font-size: 0.75rem;
    background: ${colors.white};
  `,
);

export const ItemAlertMessageWrapper = styled.div(
  ({ theme: { colors }, rounded, status, isAdminAddresses }) => css`
    background-color: ${color(status, isAdminAddresses)};
    padding: 0.5rem 1rem;
    margin-bottom: -0.5rem;
    width: 100%;
    border-radius: ${rounded && '0.75rem 0.75rem 0 0'};
    display: flex;
    align-items: center;

    span {
      display: inline-block;
      font-weight: bold;
      color: ${colors.white};
      width: 90%;
    }
  `,
);

export const Description = styled.div`
  max-width: 100%;
  text-align: left;
  padding: 1rem;
`;

export const DescriptionWrapper = styled.div`
  min-width: 100%;
  max-width: 100%;
`;

export const City = styled.div`
  margin: 0 0 0.35rem;
`;

export const Text = styled.p`
  margin: 0 0 1rem;
`;

export const Comment = styled.p(
  ({ theme: { colors } }) => css`
    word-wrap: break-word;
    color: ${colors.greyA3};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
);

export const Actions = styled.div`
  width: 100%;
  padding: 0 1rem 1rem;
`;

export const TooltipWrapper = styled.div(
  ({ disabled }) => css`
    position: relative;
    cursor: ${disabled ? 'default' : 'pointer'};
    width: fit-content;
  `,
);

export const Licenses = styled.div`
  margin: 0 0 1rem;
`;

export const LicensesList = styled.div`
  font-size: 0.875rem;
  white-space: nowrap;

  > :not(:first-child) {
    margin: 0.5rem 0 0;
  }
`;

export const MainAddressText = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.white};
    background: ${colors.green};
    padding: 0.5rem;
    border-radius: 0.375rem;
    text-align: center;
    font-weight: bold;
    font-size: 0.875rem;
  `,
);

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

export const EditActions = styled.div`
  margin: 1rem 0 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  button {
    padding: 0;
    font-size: 0.75rem;
  }
`;
