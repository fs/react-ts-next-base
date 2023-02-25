import React from 'react';

import UserCard from 'components/shared/atoms/UserCard';
import InfinityList from 'components/shared/organisms/InfinityList';

import { ADMIN_USER } from 'config/routes';
import { UsersWrapper } from './styled';

const Users = ({ users, loading, pageInfo, onLoadMore }) => {
  return (
    <InfinityList
      onLoadMore={onLoadMore}
      loading={loading}
      hasNextPage={pageInfo?.hasNextPage}
      dataLength={users.length}
      scrollableTarget="admin-template-content"
      $width="75rem"
    >
      <UsersWrapper>
        {users.map(user => {
          const { id } = user;
          return <UserCard key={id} user={user} route={ADMIN_USER} />;
        })}
      </UsersWrapper>
    </InfinityList>
  );
};

export default Users;
