import React, { useCallback, FC } from 'react';

import ProfileImage from 'components/shared/atoms/ProfileImage';

import useCloseOnOutsideClick from 'hooks/useCloseOnOutsideClick';

import UserNavigationList from './UserNavigationList';

import { TUserNavigation } from './types';
import { UserName, UserNavigationWrapper, UserNameWrapper } from './styled';

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
            <ProfileImage avatar={user.avatarUrl} alt={user.email} />
            <UserName data-testid="user-name">{user.email}</UserName>
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
