import React from 'react';
import omit from 'lodash/omit';
import Router from 'next/router';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import { getCurrentUser } from 'lib/apollo/cache/getCurrentUser';

import { HOME } from 'config/routes';
import { TNextPage } from 'lib/apollo/types';
import { isRegisteredUser } from 'config/constants/systemRoles';

import AuthTemplate from 'components/shared/templates/AuthTemplate';
import ResetPasswordForm from '../components/ResetPasswordForm';

import { PageContainer } from './styled';

const resetPasswordPage: TNextPage = () => {
  return (
    <AuthTemplate hasFooter testId="reset-password-template">
      <PageContainer>
        <ResetPasswordForm />
      </PageContainer>
    </AuthTemplate>
  );
};

resetPasswordPage.getInitialProps = context => {
  const { res, apolloClient } = context;
  const ctx = omit(context, ['req', 'res']);
  const user = getCurrentUser({ apolloClient });

  if (isRegisteredUser(user?.systemRole)) {
    res ? res.redirect(302, HOME) : Router.push(HOME);
  }
  return ctx;
};

export default withGetDataFromTree(withAuth(resetPasswordPage));
