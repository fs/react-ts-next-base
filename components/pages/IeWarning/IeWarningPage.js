import React from 'react';

import Footer from 'components/shared/organisms/Footer';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import NotSupportedPage from './components/NotSupportedPage';
import { PageContainer } from './styled';

const IeWarningPage = () => {
  return (
    <LayoutTemplate isShowMainMenu={false} testId="testId">
      <PageContainer>
        <NotSupportedPage />
        <Footer isShowLinks={false} />
      </PageContainer>
    </LayoutTemplate>
  );
};

export default IeWarningPage;
