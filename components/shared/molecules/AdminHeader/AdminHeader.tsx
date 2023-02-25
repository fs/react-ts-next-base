import React from 'react';
import Tabs from 'components/shared/molecules/Tabs';
import { Title, TitleWrapper, TabsWrapper } from './styled';
import { TAdminHeader } from './types';

const AdminHeader: React.FC<TAdminHeader> = ({ title, activeId, tabs }) => {
  return (
    <>
      <TitleWrapper>
        <Title data-testid="admin-template-title">{title}</Title>
      </TitleWrapper>
      {tabs && (
        <TabsWrapper>
          <Tabs tabs={tabs} activeId={activeId} variant="link_like" />
        </TabsWrapper>
      )}
    </>
  );
};

export default AdminHeader;
