import React from 'react';

import { SystemRoleEnum } from 'graphql/types';
import { ADMIN_ACCOUNT, ADMIN_ADMINISTRATOR } from 'config/routes';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import ProfileImage from 'components/shared/atoms/ProfileImage';

import { phoneFormatter } from 'helpers';
import { getSystemRole } from 'config/constants/systemRoles';

import RemoveAdmin from '../RemoveAdmin';

import {
  AdminItemWrapper,
  Info,
  Row,
  ImageWrapper,
  NameWrapper,
  Name,
  Contacts,
  Contact,
  ActionsWrapper,
} from './styled';

const AdminItem = ({ admin }) => {
  const { id, avatarUrl, firstName, lastName, middleName, systemRole, email, phoneNumber } = admin;

  return (
    <AdminItemWrapper>
      <Info>
        <Row>
          <ImageWrapper>
            <ProfileImage avatar={avatarUrl} id={id} />
          </ImageWrapper>

          <NameWrapper>
            <Name>
              {lastName} {firstName} {middleName}
            </Name>
            {getSystemRole(systemRole)}
          </NameWrapper>
        </Row>

        <Contacts>
          <Contact>
            <Icon name="mail-circle" $color="blue" $size={30} $mr={16} />
            {email}
          </Contact>
          <Contact>
            <Icon name="phone-circle" $color="blue" $size={30} $mr={16} />
            {phoneFormatter(phoneNumber)}
          </Contact>
        </Contacts>
      </Info>

      <ActionsWrapper>
        <Button
          variant="confirm"
          shape="rounded"
          label="Просмотреть"
          size="small"
          testId={`show-admin-${id}-button`}
          $width="8.75rem"
          href={{
            pathname:
              systemRole === SystemRoleEnum.Superadmin ? ADMIN_ACCOUNT : ADMIN_ADMINISTRATOR,
            query: systemRole === SystemRoleEnum.Superadmin ? {} : { adminId: id },
          }}
        />
        {systemRole !== SystemRoleEnum.Superadmin && <RemoveAdmin admin={admin} />}
      </ActionsWrapper>
    </AdminItemWrapper>
  );
};

export default AdminItem;
