import React from 'react';

import AdminItem from '../AdminItem';

import { AdministratorsListWrapper } from './styled';

const AdministratorsList = ({ admins }) => {
  return (
    <AdministratorsListWrapper>
      {admins.map((admin, i) => (
        <AdminItem admin={admin} key={i} />
      ))}
    </AdministratorsListWrapper>
  );
};

export default AdministratorsList;
