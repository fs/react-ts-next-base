import Link from 'next/link';
import { PROFILE, ACTIVITY, SIGNIN, SIGNUP } from 'config/routes';

import Logo from 'components/shared/atoms/Logo';

import UserNavigation from './UserNavigation';

import { THeader } from './types';
import { HeaderWrapper, Links } from './styled';

const Header: React.FunctionComponent<THeader> = ({ user, signOut }) => {
  const links = [
    { text: 'Profile', url: PROFILE, testId: 'profile' },
    { text: 'Activity', url: ACTIVITY, testId: 'activity' },
  ];

  const actions = [
    { text: 'Sign Out', onClick: signOut, testId: 'sign-out' },
    { text: 'Log out from all devices', onClick: () => signOut({ everywhere: true }) },
  ];

  return (
    <HeaderWrapper>
      <Logo />
      <Links data-cy="header-links">
        {!user && (
          <>
            <Link href={SIGNIN} passHref>
              <a>Sign In</a>
            </Link>
            |
            <Link href={SIGNUP} passHref>
              <a>Sign Up</a>
            </Link>
          </>
        )}
        {!!user && <UserNavigation user={user} links={links} actions={actions} />}
      </Links>
    </HeaderWrapper>
  );
};

export default Header;
