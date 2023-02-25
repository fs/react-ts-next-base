import React from 'react';
import omit from 'lodash/omit';
import Router from 'next/router';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';

import { HOME } from 'config/routes';
import { TNextPage } from 'lib/apollo/types';
import { isRegisteredUser } from 'config/constants/systemRoles';

import AuthTemplate from 'components/shared/templates/AuthTemplate';
import { getCurrentUser } from 'lib/apollo/cache/getCurrentUser';
import NewPasswordForm from '../components/NewPasswordForm';

import { PageContainer } from './styled';

const NewPasswordPage: TNextPage = ({ query }) => {
  return (
    <AuthTemplate hasFooter testId="new-password-template">
      <PageContainer>
        <NewPasswordForm query={query} />
      </PageContainer>
    </AuthTemplate>
  );
};

NewPasswordPage.getInitialProps = context => {
  const { res, apolloClient } = context;
  const ctx = omit(context, ['req', 'res']);
  const user = getCurrentUser({ apolloClient });

  if (isRegisteredUser(user?.systemRole)) {
    res ? res.redirect(302, HOME) : Router.push(HOME);
  }
  return ctx;
};

export default withGetDataFromTree(withAuth(NewPasswordPage));
