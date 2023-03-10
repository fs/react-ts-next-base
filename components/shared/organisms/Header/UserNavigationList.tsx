import React, { FC } from 'react';
import Link from 'next/link';

import { TUserNavigationList } from './types';
import { StyledUserMenu, UserMenuItem } from './styled';

const UserNavigationList: FC<TUserNavigationList> = ({ links = [], actions = [] }) => (
  <StyledUserMenu>
    {links.map(({ text, url, testId }) => {
      return (
        <UserMenuItem key={text} data-cy={testId}>
          <Link href={url} passHref>
            {text}
          </Link>
        </UserMenuItem>
      );
    })}

    {actions.map(({ text, onClick, testId }) => {
      return (
        <UserMenuItem key={text}>
          <button data-cy={testId} type="button" onClick={onClick}>
            {text}
          </button>
        </UserMenuItem>
      );
    })}
  </StyledUserMenu>
);

export default UserNavigationList;
