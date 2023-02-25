import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import { CurrentUserInfoFragment } from 'graphql/fragments/__generated__/currentUserInfo.generated';

export type TDashboardTemplate = {
  children: React.ReactNode;
  testId?: string;
  sidebarContent?: React.ReactNode;
  query: ParsedUrlQuery;
  showBreadcrumbs?: boolean;
};

export type TUserInfo = {
  user?: CurrentUserInfoFragment | null;
  showBreadcrumbs?: boolean;
  query: ParsedUrlQuery;
};
