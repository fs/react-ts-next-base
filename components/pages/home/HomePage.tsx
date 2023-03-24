import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withAuthSecurity from 'lib/auth/withAuthSecurity';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';

import { TNextPage } from 'lib/apollo/types';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';

import { Title, PageContent } from './styled';

export const HomePage: TNextPage = () => {
  return (
    <DefaultTemplate>
      <PageContent data-testid="page-content">
        <Title className="capitalize" data-testid="welcome-page">
          Welcome to React Next Base
        </Title>
      </PageContent>
    </DefaultTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(HomePage)));
