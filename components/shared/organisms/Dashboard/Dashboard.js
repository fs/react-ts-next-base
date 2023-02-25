import React from 'react';
import { useModal } from '@ebay/nice-modal-react';

import ActionLink from 'components/shared/atoms/ActionLink';
import SupportRequestModal from 'components/shared/molecules/SupportRequestModal';
import { PageContainer, Sidebar, MainContent, HelpWrapper } from './styled';

const Dashboard = ({ sidebarContent, children }) => {
  const supportRequestModal = useModal(SupportRequestModal);
  const onSupportRequestLinkClick = async () => {
    await supportRequestModal.show({});
  };

  return (
    <PageContainer>
      <Sidebar>
        {sidebarContent}
        <HelpWrapper>
          <ActionLink $color="white" onClick={onSupportRequestLinkClick}>
            Обратиться в поддержку
          </ActionLink>
        </HelpWrapper>
      </Sidebar>
      <MainContent>{children}</MainContent>
    </PageContainer>
  );
};

export default Dashboard;
