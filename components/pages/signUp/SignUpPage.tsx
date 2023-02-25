import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withNotAuthSecurity from 'lib/auth/withNotAuthSecurity';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';

import SignUpForm from './components/SignUpForm';

import { PageContentWrapper } from './styled';

const SignUpPage = () => {
  return (
    <DefaultTemplate testId="signup-page">
      <PageContentWrapper>
        <SignUpForm />
      </PageContentWrapper>
    </DefaultTemplate>
  );
};

export default withGetDataFromTree(withAuth(withNotAuthSecurity(SignUpPage)));
