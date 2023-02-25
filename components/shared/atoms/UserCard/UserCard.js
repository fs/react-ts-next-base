import React from 'react';
import { useModal } from '@ebay/nice-modal-react';

import { dateFormat, phoneFormatter } from 'helpers';

import { useBlockUser, useUnblockUser } from 'lib/apollo/hooks/actions/users';

import Button from 'components/shared/atoms/Button';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import {
  ActionsWrapper,
  CardWrapper,
  Date,
  Email,
  FullName,
  PhoneNumber,
  Role,
  UserInfo,
} from './styled';

const getDescriptionRoleTextByAction = action => {
  return (
    <div>
      <b>
        Вы уверены, что хотите {action === 'block' ? 'заблокировать' : 'восстановить'} выбранного
        руководителя?
      </b>
      <br />
      <br />
      <span>
        Нажимая “Подтвердить”, вы {action === 'block' ? 'заблокируете' : 'разблокируете'}{' '}
        руководителя и все его компании на сайте
      </span>
    </div>
  );
};

const UserCard = ({ user, route }) => {
  const { role, fullName, email, createdAt, phoneNumber, id, blockedAt } = user;
  const roleName = role?.name || '';

  const [onBlockUser] = useBlockUser({});
  const [onUnblockUser] = useUnblockUser({});
  const blockUserModal = useModal(SimpleModal);
  const unblockUserModal = useModal(SimpleModal);

  const showAddUserToBlackList = () => {
    blockUserModal.show({
      variant: 'change',
      roundedButton: true,
      onSubmit: async () => {
        await onBlockUser({ userId: id });
      },
      title: role.id === 'employee' ? 'Блокировка пользователя' : 'Блокировка руководителя',
      description:
        role.id === 'employee'
          ? 'Нажимая “Подтвердить”, вы заблокируете пользователя на сайте'
          : getDescriptionRoleTextByAction('block'),
    });
  };

  const showRestoreUserFromBlackList = () => {
    unblockUserModal.show({
      variant: 'confirm',
      roundedButton: true,
      onSubmit: async () => {
        await onUnblockUser({ userId: id });
      },
      title: role.id === 'employee' ? 'Восстановление пользователя' : 'Восстановление руководителя',
      description:
        role.id === 'employee'
          ? 'Нажимая “Подтвердить”, вы восстановите аккаунт пользователя на сайте'
          : getDescriptionRoleTextByAction('unblock'),
    });
  };

  return (
    <CardWrapper>
      <UserInfo>
        <Role>{roleName.charAt(0).toUpperCase()}</Role>
        <FullName href={{ pathname: route, query: { userId: id } }} passHref>
          {fullName}
        </FullName>
      </UserInfo>
      <Email>{email}</Email>
      <Date>Дата регистрации: {dateFormat(createdAt)}</Date>
      {phoneNumber && <PhoneNumber>{phoneFormatter(phoneNumber)}</PhoneNumber>}
      <ActionsWrapper>
        <Button
          label="Подробнее"
          shape="rounded"
          $width="100%"
          href={{ pathname: route, query: { userId: id } }}
        />
        {blockedAt ? (
          <Button
            label="Восстановить"
            variant="confirm"
            shape="rounded"
            onClick={showRestoreUserFromBlackList}
            $width="100%"
          />
        ) : (
          <Button
            label="Заблокировать"
            variant="change"
            shape="rounded"
            onClick={showAddUserToBlackList}
            $width="100%"
          />
        )}
      </ActionsWrapper>
    </CardWrapper>
  );
};

export default UserCard;
