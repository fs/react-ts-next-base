import React from 'react';

import withAuth from 'lib/auth/withAuth';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';
import withNotAuthSecurity from 'lib/auth/withNotAuthSecurity';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';

import RecoveryPasswordForm from './components/RecoveryPasswordForm';

import { PageContentWrapper } from './styled';

const RecoveryPasswordPage = () => {
  return (
      <DefaultTemplate testId="recovery-password-page">
        <PageContentWrapper>
          <RecoveryPasswordForm />
        </PageContentWrapper>
      </DefaultTemplate>
  );
};

export default withGetDataFromTree(withAuth(withNotAuthSecurity(RecoveryPasswordPage)));
