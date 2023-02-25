import React from 'react';
import { NetworkStatus } from '@apollo/client';

import useCurrentUser from 'hooks/useCurrentUser';

import Dashboard from 'components/shared/organisms/Dashboard';
import JoinUserForm from 'components/shared/organisms/JoinUserForm';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import UserInfo from './UserInfo';

import { SidebarContentWrapper } from './styled';
import { TDashboardTemplate } from './types';

const DashboardTemplate: React.FunctionComponent<TDashboardTemplate> = ({
  children,
  testId,
  sidebarContent,
  query,
  showBreadcrumbs = false,
}) => {
  const { user, networkStatus } = useCurrentUser();
  const { phoneNumber, firstName } = user || {};
  const isLoadingCurrentUser = [NetworkStatus.loading, NetworkStatus.setVariables].includes(
    networkStatus,
  );

  return (
    <LayoutTemplate testId={testId}>
      {!isLoadingCurrentUser && (
        <>
          {user && !phoneNumber && !firstName ? (
            <JoinUserForm />
          ) : (
            <Dashboard
              sidebarContent={
                <div>
                  <UserInfo user={user} showBreadcrumbs={showBreadcrumbs} query={query} />
                  <SidebarContentWrapper data-testid="dashboard-content">
                    {sidebarContent}
                  </SidebarContentWrapper>
                </div>
              }
            >
              {children}
            </Dashboard>
          )}
        </>
      )}
    </LayoutTemplate>
  );
};

export default DashboardTemplate;
