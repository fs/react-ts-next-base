import React from 'react';

import { TMargin } from 'public/styles/config/margin';

export type TNotification = TMargin & {
  text: string | React.ReactNode;
  isShow?: boolean;
};

export type TNotificationWrapper = TMargin;
