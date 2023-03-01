import React from 'react';

import Header from 'components/shared/organisms/Header';

import useCurrentUser from 'hooks/useCurrentUser';
import { useSignOut } from 'lib/apollo/hooks/actions/auth';

import { TDefaultTemplate } from './types';
import { Wrapper, PageContent } from './styled';

const DefaultTemplate: React.FunctionComponent<TDefaultTemplate> = ({
  children,
  testId = 'default-template',
}) => {
  const { user } = useCurrentUser();
  const [signOut] = useSignOut();

  return (
    <Wrapper data-cy={testId} data-testid={testId}>
      <Header user={user} signOut={signOut} />
      <PageContent>{children}</PageContent>
    </Wrapper>
  );
};

export default DefaultTemplate;