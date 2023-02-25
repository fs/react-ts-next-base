import styled, { css } from 'styled-components';
import theme from 'public/styles/theme';

const statusColor = status => {
  let color;
  switch (status) {
    case 'IN_ASSEMBLY' || 'CONFIRMED':
      color = theme.colors.blue;
      break;
    case 'IN_TRANSIT' || 'DISPUTE_OPENED' || 'MEDAGREGATOR_INTERVENED':
      color = theme.colors.blue;
      break;
    case 'DELIVERED':
      color = theme.colors.green;
      break;
    default:
      color = theme.colors.blue;
  }
  return color;
};

export const DeliveryHistoryWrapper = styled.div`
  position: relative;
  padding: 1.75rem;
`;

export const Title = styled.h2`
  font-weight: bold;
  font-size: 0.875rem;
  margin: 0 0 2rem;
`;

export const DeliveryPoint = styled.div(
  ({ status }) => css`
    position: relative;
    display: flex;
    margin-left: 0.25rem;

    &:not(:last-child) {
      border-left: 1px solid ${statusColor(status)};
    }
  `,
);

export const Mark = styled.div(
  ({ status }) => css`
    position: absolute;
    left: -0.25rem;
    top: -0.25rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${statusColor(status)};

    ${status === 'DELIVERED' &&
    css`
      left: -0.75rem;
      top: -0.75rem;
      width: 1.5rem;
      height: 1.5rem;
      background-image: url("data:image/svg+xml, %3Csvg width='9' height='15' viewBox='0 0 9 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 0C2.01469 0 0 1.88877 0 4.21875C0 6.30791 1.62375 8.03027 3.75 8.3666V14.1568L4.26594 14.8825C4.37719 15.039 4.6225 15.039 4.73406 14.8825L5.25 14.1568V8.3666C7.37625 8.03027 9 6.30791 9 4.21875C9 1.88877 6.98531 0 4.5 0ZM4.5 7.03125C2.84562 7.03125 1.5 5.76943 1.5 4.21875C1.5 2.66777 2.84562 1.40625 4.5 1.40625C6.15438 1.40625 7.5 2.66777 7.5 4.21875C7.5 5.76943 6.15438 7.03125 4.5 7.03125ZM4.5 2.34375C3.3975 2.34375 2.5 3.18457 2.5 4.21875C2.5 4.47773 2.72375 4.6875 3 4.6875C3.27625 4.6875 3.5 4.47773 3.5 4.21875C3.5 3.70195 3.94812 3.28125 4.5 3.28125C4.77625 3.28125 5 3.07148 5 2.8125C5 2.55352 4.77625 2.34375 4.5 2.34375Z' fill='white'/%3E%3C/svg%3E%0A");
      background-position: center;
      background-repeat: no-repeat;
    `}
  `,
);

export const DeliveryPointInfo = styled.div`
  left: -0.25rem;
  font-size: 0.75rem;
  line-height: 1.3rem;
  margin: -0.6rem 0 1.5rem 1.5rem;
`;
