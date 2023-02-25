import React from 'react';

import ActionLink from 'components/shared/atoms/ActionLink';
import ProfileImage from 'components/shared/atoms/ProfileImage';

import { DASHBOARD } from 'config/routes';
import { getCompanyDirection } from 'config/constants/directions';

import MenuLinks from './MenuLinks';

import { Profile, ImageWrapper, Name, Company, Status, Row } from './styled';

const Menu = ({ user, links }) => {
  const { firstName, middleName, lastName, avatarUrl, id, mainCompany } = user;
  const { legalForm, officialName, direction } = mainCompany || {};

  const fullName = [firstName, middleName].filter(Boolean).join(' ');

  return (
    <Row>
      <Profile>
        <ImageWrapper>
          <ProfileImage avatar={avatarUrl} id={id} />
        </ImageWrapper>

        <Name>
          {lastName}
          <br />
          {fullName}
        </Name>

        {!!mainCompany && (
          <>
            <Company>
              {legalForm?.shortName} &quot;{officialName}&quot;
            </Company>
            <Status>Статус: {getCompanyDirection(direction)}</Status>
            <ActionLink
              label="Переключиться на другую компанию"
              href={{ pathname: DASHBOARD, query: { direction } }}
            />
          </>
        )}
      </Profile>

      <MenuLinks items={links} />
    </Row>
  );
};

export default Menu;
