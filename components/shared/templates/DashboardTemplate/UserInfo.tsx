import React from 'react';

import { DASHBOARD } from 'config/routes';

import ProfileImage from 'components/shared/atoms/ProfileImage';
import Breadcrumbs from 'components/shared/atoms/Breadcrumbs';

import { TUserInfo } from './types';
import { WrapperUserInfo, BreadcrumbsWrapper, Info, ImageWrapper, UserName } from './styled';

const UserInfo: React.FunctionComponent<TUserInfo> = ({ user, showBreadcrumbs, query }) => {
  const { firstName, lastName, middleName, avatarUrl } = user || {};
  const fullName = [firstName, middleName].filter(Boolean).join(' ');
  const { direction } = query || {};

  return (
    <WrapperUserInfo data-testid="dashboard-user-info">
      <BreadcrumbsWrapper>
        {showBreadcrumbs && (
          <Breadcrumbs
            url={DASHBOARD}
            params={{ direction }}
            text="Вернуться к списку компаний"
            variant="light"
          />
        )}
      </BreadcrumbsWrapper>
      {user && (
        <Info>
          <ImageWrapper>
            <ProfileImage avatar={avatarUrl} id={user.id} />
          </ImageWrapper>

          <UserName>
            {lastName}
            <br />
            {fullName}
          </UserName>
        </Info>
      )}
    </WrapperUserInfo>
  );
};
export default UserInfo;
