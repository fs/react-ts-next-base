import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withNotAuthSecurity from 'lib/auth/withNotAuthSecurity';

import { TNextPage } from 'lib/apollo/types';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';

import SignUpForm from './components/SignUpForm';

import { PageContentWrapper } from './styled';

const SignUpPage: TNextPage = () => {
  return (
    <DefaultTemplate testId="signup-page">
      <PageContentWrapper>
        <SignUpForm />
      </PageContentWrapper>
    </DefaultTemplate>
  );
};

export default withGetDataFromTree(withAuth(withNotAuthSecurity(SignUpPage)));
