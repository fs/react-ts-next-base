import styled, { css } from 'styled-components';

import { getMarginStyles } from 'public/styles/config/margin';

import { TNotificationWrapper } from './types';

export const NotificationWrapper = styled.div<TNotificationWrapper>(
  ({ theme: { colors }, ...props }) => css`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 0.75rem;
    background: ${colors.green};
    color: ${colors.white};
    font-size: 0.875rem;
    ${getMarginStyles(props)}
  `,
);

export const Content = styled.div`
  padding: 0.75rem 0;
  display: flex;
  align-items: center;
`;

export const Text = styled.span`
  max-width: 45rem;
  margin: 0;
`;
