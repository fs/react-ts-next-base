import React, { FC } from 'react';
import { PROFILE, ACTIVITY, SIGNIN, SIGNUP } from 'config/routes';

import Logo from 'components/shared/atoms/Logo';
import ActionLink from 'components/shared/atoms/ActionLink';

import UserNavigation from './UserNavigation';

import { ActionsConfig, THeader } from './types';
import { HeaderWrapper, Links } from './styled';

const Header: FC<THeader> = ({ user, signOut }) => {
  const links = [
    { text: 'Profile', url: PROFILE, testId: 'profile' },
    { text: 'Activity', url: ACTIVITY, testId: 'activity' },
  ];

  const actions: ActionsConfig[] = [
    { text: 'Sign Out', onClick: () => signOut({ everywhere: false }), testId: 'sign-out' },
    { text: 'Log out from all devices', onClick: () => signOut({ everywhere: true }) },
  ];

  return (
    <HeaderWrapper>
      <Logo />
      <Links data-cy="header-links">
        {!user && (
          <>
            <ActionLink label="Sign In" href={SIGNIN} />
            |
            <ActionLink label="Sign Up" href={SIGNUP} />
          </>
        )}
        {!!user && <UserNavigation user={user} links={links} actions={actions} />}
      </Links>
    </HeaderWrapper>
  );
};

export default Header;
