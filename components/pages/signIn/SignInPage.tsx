import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withNotAuthSecurity from 'lib/auth/withNotAuthSecurity';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';

import SignInForm from './components/SignInForm';

import { PageContentWrapper } from './styled';

const SignInPage = () => {
  return (
    <DefaultTemplate testId="signin-page">
      <PageContentWrapper>
        <SignInForm />
      </PageContentWrapper>
    </DefaultTemplate>
  );
};

export default withGetDataFromTree(withAuth(withNotAuthSecurity(SignInPage)));
