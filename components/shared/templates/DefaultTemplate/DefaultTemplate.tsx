import { FC } from 'react';

import { useSignOut } from 'lib/apollo/hooks/actions/auth';
import useCurrentUser from 'hooks/useCurrentUser';

import Header from 'components/shared/organisms/Header';

import { PageContent, Wrapper } from './styled';
import { TDefaultTemplate } from './types';

const DefaultTemplate: FC<TDefaultTemplate> = ({ children, testId = 'default-template' }) => {
  const { user } = useCurrentUser();
  const [signOut] = useSignOut();

  return (
    <Wrapper data-testid={testId}>
      <Header user={user} signOut={signOut} />
      <PageContent>{children}</PageContent>
    </Wrapper>
  );
};

export default DefaultTemplate;
