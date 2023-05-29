import { FC, useCallback } from 'react';

import useCloseOnOutsideClick from 'hooks/useCloseOnOutsideClick';

import ProfileImage from 'components/shared/atoms/ProfileImage';

import UserNavigationList from './UserNavigationList';

import { ImageWrapper, UserName, UserNameWrapper, UserNavigationWrapper } from './styled';
import { TUserNavigation } from './types';

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
