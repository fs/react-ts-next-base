import React, { useState, useRef, useEffect, useCallback } from 'react';

import ProfileImage from 'components/shared/atoms/ProfileImage';

import UserNavigationList from './UserNavigationList';

import { TUserNavigation } from './types';
import { UserName, UserNavigationWrapper, UserNameWrapper } from './styled';

const UserNavigation: React.FunctionComponent<TUserNavigation> = ({ user, links, actions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef?.current &&
        event.target instanceof Node &&
        wrapperRef?.current?.contains(event.target)
      ) {
        return;
      }
      toggleDropdown();
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, toggleDropdown]);

  return (
    <UserNavigationWrapper ref={wrapperRef}>
      {user && (
        <>
          <UserNameWrapper
            data-testid="user-name"
            data-cy="dropdown-toggler"
            onClick={toggleDropdown}
          >
            <ProfileImage avatar={user.avatarUrl} alt={user.email} />
            <UserName data-cy="user-name">{user.email}</UserName>
          </UserNameWrapper>
          {isOpen && (
            <UserNavigationList
              links={links}
              actions={actions}
              data-testid="user-navigation"
              data-cy="user-navigation-list"
            />
          )}
        </>
      )}
    </UserNavigationWrapper>
  );
};

export default UserNavigation;
