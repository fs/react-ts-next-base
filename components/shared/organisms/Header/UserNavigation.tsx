import { useCallback, FC } from 'react';

import ProfileImage from 'components/shared/atoms/ProfileImage';

import useCloseOnOutsideClick from 'hooks/useCloseOnOutsideClick';

import UserNavigationList from './UserNavigationList';

import { TUserNavigation } from './types';
import { UserName, UserNavigationWrapper, UserNameWrapper, ImageWrapper } from './styled';

const UserNavigation: FC<TUserNavigation> = ({ user, links, actions }) => {
  const [isOpen, setIsOpen, wrapperRef, togglerRef] = useCloseOnOutsideClick();

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <UserNavigationWrapper ref={wrapperRef}>
      {user && (
        <>
          <UserNameWrapper data-testid="dropdown-toggler" onClick={toggleDropdown} ref={togglerRef}>
            <ImageWrapper>
              <ProfileImage avatar={user.avatarUrl} alt={user.email} />
            </ImageWrapper>
            <UserName data-testid="user-name" title={user.email}>
              {user.email}
            </UserName>
          </UserNameWrapper>
          {isOpen && (
            <UserNavigationList
              links={links}
              actions={actions}
              data-testid="user-navigation-list"
            />
          )}
        </>
      )}
    </UserNavigationWrapper>
  );
};

export default UserNavigation;
