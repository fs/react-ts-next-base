import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withRoutesRules from 'lib/roles/withRoutesRules';

import UnavailablePage from 'components/shared/molecules/UnavailablePage';
import LayoutTemplate from 'components/shared/templates/LayoutTemplate';

import { PageContainer, Content, Header } from './styled';

const NewsPage = () => {
  return (
    <LayoutTemplate testId="news-page">
      <PageContainer>
        <Content>
          <Header>Новости</Header>
          <UnavailablePage />
        </Content>
      </PageContainer>
    </LayoutTemplate>
  );
};

export default withGetDataFromTree(withAuth(withRoutesRules(NewsPage)));
