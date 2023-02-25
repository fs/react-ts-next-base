import React from 'react';

import Header from 'components/shared/organisms/Header';
import AdminSidebar from 'components/shared/molecules/AdminSidebar';
import ErrorBoundary from 'components/shared/molecules/ErrorBoundary';
import AdminHeader from 'components/shared/molecules/AdminHeader';

import { Wrapper, Content, PageContent, ContentWrapper } from './styled';
import { TAdminTemplate } from './types';

const AdminTemplate: React.FunctionComponent<TAdminTemplate> = ({
  children,
  testId,
  showSidebar = true,
  title,
  activeId,
  tabs,
}) => {
  return (
    <Wrapper data-testid={testId} id="admin-template-content">
      <Header isLight />

      <Content>
        {showSidebar ? (
          <>
            <AdminSidebar />
            <PageContent>
              <ErrorBoundary>
                {title && <AdminHeader title={title} activeId={activeId} tabs={tabs} />}
                {children && <ContentWrapper>{children}</ContentWrapper>}
              </ErrorBoundary>
            </PageContent>
          </>
        ) : (
          children
        )}
      </Content>
    </Wrapper>
  );
};

export default AdminTemplate;
