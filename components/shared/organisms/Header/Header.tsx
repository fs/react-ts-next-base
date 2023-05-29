import { FC } from 'react';

import { ACTIVITY, PROFILE, SIGNIN, SIGNUP } from 'config/routes';

import ActionLink from 'components/shared/atoms/ActionLink';
import Logo from 'components/shared/atoms/Logo';

import UserNavigation from './UserNavigation';

import { HeaderWrapper, Links } from './styled';
import { ActionsConfig, THeader } from './types';

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
      <Links data-testid="header-links">
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
