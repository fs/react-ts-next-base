import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import theme from 'public/styles/theme';

import { OrderExecutionStatusEnum } from 'graphql/types';
import { TStatusProps } from './types';

const {
  Confirmed,
  Delivered,
  DisputeOpened,
  InAssembly,
  InTransit,
  MedagregatorIntervened,
  PaymentPending,
} = OrderExecutionStatusEnum;

const statusColor = ({ status }: TStatusProps) => {
  let color;
  switch (status) {
    case PaymentPending:
      color = theme.colors.redE5;
      break;
    case InAssembly:
    case Confirmed:
      color = theme.colors.blue;
      break;
    case InTransit:
    case DisputeOpened:
    case MedagregatorIntervened:
      color = theme.colors.orange;
      break;
    case Delivered:
      color = theme.colors.green;
      break;
    default:
      color = theme.colors.error;
  }
  return color;
};

export const Wrapper = styled.div<TStatusProps>(
  ({ theme: { colors }, status }) => css`
    margin: 1rem 0.2rem;
    padding-right: 0.2rem;
    box-shadow: 0 0 0.375rem ${transparentize(0.8, colors.blue00)};
    border-left: 6px solid ${statusColor({ status })};
    font-size: 0.75rem;
    background-color: ${theme.colors.white};
  `,
);

export const LeftCol = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    align-items: flex-end;
    gap: 0.75rem;

    ${down(breakpoints.md)} {
      flex-direction: column;
      align-items: flex-start;
    }
  `,
);

export const CompanyInfo = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const FlexBlock = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    margin: 0 0 0.5rem;

    > :not(:first-child) {
      margin: 0 0 0 2rem;
    }

    ${down(breakpoints.md)} {
      flex-direction: column;

      > :not(:first-child) {
        margin: 1rem 0 0 0;
      }
    }
  `,
);

export const Col = styled.div(
  ({ theme: { breakpoints, up } }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 auto;

    ${up(breakpoints.md)} {
      min-height: 100%;
    }
  `,
);

export const SellerNameWrapper = styled(Col)`
  justify-content: center;
  line-height: 1.15rem;
`;

export const LogoWrapper = styled.div`
  height: 3rem;
  min-width: 3rem;
  margin-left: 1rem;
  border-radius: 0.75rem;
  overflow: hidden;
`;

export const LogoSeller = styled.img`
  height: 100%;
`;

export const Header = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: bold;
`;

export const Text = styled.p`
  margin: 0 0 0.5rem;
`;

export const Status = styled.p(
  ({ status }: TStatusProps) => css`
    display: flex;
    align-items: center;
    margin: 1rem 0 0;

    &:before {
      width: 0.625rem;
      height: 0.625rem;
      margin-right: 0.4rem;
      border-radius: 50%;
      background: ${statusColor({ status })};
      content: '';
    }
  `,
);

export const DisputeDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  gap: 0.15rem;
`;

export const TotalAmount = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;

    ${down(breakpoints.lg)} {
      flex-direction: column;
    }
  `,
);

export const Coast = styled.span`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
`;

export const Count = styled.strong(
  ({ theme: { colors } }) => css`
    margin-left: 0.4rem;
    color: ${colors.blue};
    font-size: 0.875rem;
  `,
);

export const ColDeliveryDate = styled(Col)`
  justify-content: space-between;
`;

export const DeliveryDate = styled.div`
  display: flex;
  padding: 0.7rem 1.3rem 0.7rem 0;
`;

export const DeliveryDateInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TotalCoast = styled.strong(
  ({ theme: { colors } }) => css`
    margin-left: 0.5rem;
    color: ${colors.orange};
    font-size: 0.875rem;
  `,
);

export const ActionsWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 1.5rem 1rem;

    ${down(breakpoints.lg)} {
      flex-direction: column;
    }
  `,
);

export const ButtonsWrapper = styled.div(
  ({ theme: { breakpoints, down } }) => css`
    display: flex;
    gap: 0.5rem;

    ${down(breakpoints.lg)} {
      justify-content: flex-end;
    }
  `,
);

export const RightCol = styled(Col)`
  align-items: flex-end;
  justify-content: space-between;
  text-align: end;
  margin-left: 1rem;
`;

export const Row = styled.div(
  ({ theme: { colors } }) => css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1rem 1.5rem;

    &:nth-last-child(n + 3) {
      border-bottom: 1px solid ${colors.greyB6};
    }
  `,
);

export const Strong = styled.strong`
  display: block;
  font-size: 0.875rem;
`;
