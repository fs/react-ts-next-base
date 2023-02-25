import React from 'react';

import ProfileImage from 'components/shared/atoms/ProfileImage';

import {
  AdministratorDetailsWrapper,
  AdminAvatarWrapper,
  ImageWrapper,
  DetailsItem,
  DetailsTitle,
  DetailsValue,
} from './styled';

const AdministratorDetails = ({ admin }) => {
  const { id, firstName, lastName, middleName, email, phoneNumber, avatarUrl } = admin;

  const adminDetails = [
    { title: 'Фамилия', value: lastName },
    { title: 'Имя', value: firstName },
    { title: 'Отчество', value: middleName },
    { title: 'e-mail', value: email },
    { title: 'Телефон', value: phoneNumber },
  ];

  return (
    <AdministratorDetailsWrapper>
      <AdminAvatarWrapper>
        <ImageWrapper>
          <ProfileImage avatar={avatarUrl} id={id} />
        </ImageWrapper>
      </AdminAvatarWrapper>

      <div>
        {adminDetails.map(({ title, value }, index) => (
          <DetailsItem key={index}>
            <DetailsTitle>{title}</DetailsTitle>
            <DetailsValue>{value}</DetailsValue>
          </DetailsItem>
        ))}
      </div>
    </AdministratorDetailsWrapper>
  );
};

export default AdministratorDetails;
