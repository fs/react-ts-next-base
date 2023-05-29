import withAuth from 'lib/auth/withAuth';
import withNotAuthSecurity from 'lib/auth/withNotAuthSecurity';
import withGetDataFromTree from 'lib/apollo/withGetDataFromTree';

import { TNextPage } from 'lib/apollo/types';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';

import RecoveryPasswordForm from './components/RecoveryPasswordForm';

import { PageContentWrapper } from './styled';

const RecoveryPasswordPage: TNextPage = () => {
  return (
    <DefaultTemplate testId="recovery-password-page">
      <PageContentWrapper>
        <RecoveryPasswordForm />
      </PageContentWrapper>
    </DefaultTemplate>
  );
};

export default withGetDataFromTree(withAuth(withNotAuthSecurity(RecoveryPasswordPage)));
