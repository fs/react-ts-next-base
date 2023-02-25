import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';

import { NOT_VERIFIED, REJECTED } from 'config/constants/status';

const color = status => {
  switch (status) {
    case NOT_VERIFIED:
      return theme.colors.orange;
    case REJECTED:
      return theme.colors.error;
    default:
      return theme.colors.orange;
  }
};

export const CompanyCheck = styled.div(
  ({ status }) => css`
    width: 100%;
    background-color: ${color(status)};
    display: flex;
    align-items: center;
    padding: 0.3rem 0.2rem;
  `,
);

export const IconWrap = styled.div`
  width: 3.5rem;
  display: flex;
  justify-content: center;
`;

export const CheckText = styled.div(
  ({ theme: { colors } }) => css`
    color: ${colors.white};
    font-size: 0.75rem;
    font-weight: bold;
    line-height: 1rem;
  `,
);
