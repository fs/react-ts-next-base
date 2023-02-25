import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withAuthSecurity from 'lib/auth/withAuthSecurity';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';

import { Title, PageContent } from './styled';

const HomePage = () => {
  return (
      <DefaultTemplate>
        <PageContent data-testid="page-content">
          <Title className="capitalize" data-cy="welcome-page">
            Welcome to React Next Base
          </Title>
        </PageContent>
      </DefaultTemplate>
  );
};

export default withGetDataFromTree(withAuth(withAuthSecurity(HomePage)));
