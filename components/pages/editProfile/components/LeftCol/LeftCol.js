import React from 'react';

import EditAvatar from '../EditAvatar';
import EditName from '../EditName';
import EditPassword from '../EditPassword';
import RemoveAccount from '../RemoveAccount';

import { LeftColWrapper } from './styled';

const LeftCol = ({ user }) => {
  return (
    <LeftColWrapper>
      <EditAvatar user={user} />
      <EditName user={user} />
      <EditPassword />
      <RemoveAccount />
    </LeftColWrapper>
  );
};

export default LeftCol;
