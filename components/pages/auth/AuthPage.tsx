import React from 'react';
import Router from 'next/router';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';

import { HOME } from 'config/routes';

import AuthTemplate from 'components/shared/templates/AuthTemplate';
import { isRegisteredUser } from 'config/constants/systemRoles';
import { getCurrentUser } from 'lib/apollo/cache/getCurrentUser';
import { TNextPage } from 'lib/apollo/types';
import AuthForm from './components/AuthForm';
import { PageContainer } from './styled';

const AuthPage: TNextPage = ({ query }) => {
  const { signup: isSignUp } = query;

  return (
    <AuthTemplate testId="auth-template">
      <PageContainer>
        <AuthForm isSignUp={isSignUp} />
      </PageContainer>
    </AuthTemplate>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
AuthPage.getInitialProps = ({ req, res, ...ctx }) => {
  const { apolloClient } = ctx;
  const user = getCurrentUser({ apolloClient });

  if (isRegisteredUser(user?.systemRole)) {
    res ? res.redirect(302, HOME) : Router.push(HOME);
  }

  return ctx;
};

export default withGetDataFromTree(withAuth(AuthPage));
