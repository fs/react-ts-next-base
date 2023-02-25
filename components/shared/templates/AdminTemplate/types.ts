import React from 'react';
import { TTabParam } from 'components/shared/molecules/Tabs/types';

export type TAdminTemplate = {
  children?: React.ReactNode;
  testId?: string;
  showSidebar?: boolean;
  title?: string;
  activeId?: string;
  tabs?: TTabParam[];
};
