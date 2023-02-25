import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import useCurrentUser from 'hooks/useCurrentUser';
import { useMyCompanies } from 'lib/apollo/hooks/state/myCompanies';

import userHasAccess from 'rbac/userHasAccess';
import { addCompanyMemberRule, destroyCompanyMemberRule } from 'rbac/rules';
import { VERIFIED } from 'config/constants/status';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import AcceptModal from 'components/shared/molecules/Modal/AcceptModal';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import CreateMemberModal from '../CreateMemberModal';
import ListMembersModal from '../ListMembersModal';

import { EmployeeControlWrapper } from './styled';

const EmployeeControl = () => {
  const { user } = useCurrentUser();
  const isShowDestroyCompanyMemberButton = userHasAccess(user?.role.id, destroyCompanyMemberRule);
  const isShowAddCompanyMemberButton = userHasAccess(user?.role.id, addCompanyMemberRule);

  const { myCompanies } = useMyCompanies({ statuses: [VERIFIED] });
  const declineMemberModal = useModal(SimpleModal);

  const showDeclineMember = email => {
    declineMemberModal.show({
      showCancel: false,
      title: 'Добавление пользователя',
      description: (
        <>
          Пользователь <strong>{email}</strong> уже зарегистрирован на сайте.
          <br />
          Выберите другого пользователя.
        </>
      ),
      acceptText: 'Принять',
    });
  };

  const showAcceptMember = () => {
    NiceModal.show(AcceptModal);
  };

  const showCreateMembers = () => {
    NiceModal.show(CreateMemberModal, {
      myCompanies,
      onError: showDeclineMember,
      onSuccess: showAcceptMember,
    });
  };

  const showListMembers = () => {
    NiceModal.show(ListMembersModal, {
      myCompanies,
    });
  };

  return (
    <EmployeeControlWrapper>
      {isShowAddCompanyMemberButton && (
        <Button
          label="Добавить пользователя"
          variant="ghost"
          iconType="leading"
          icon={<Icon name="user-add" $color="white" $size={20} />}
          size="small"
          $width="13rem"
          testId="add-company-member-button"
          onClick={showCreateMembers}
          disabled={!myCompanies?.length}
        />
      )}
      {isShowDestroyCompanyMemberButton && (
        <Button
          label="Удалить пользователя"
          variant="ghost"
          iconType="leading"
          icon={<Icon name="user-remove" $color="white" $size={20} />}
          size="small"
          $width="13rem"
          testId="edit-company-member-button"
          onClick={showListMembers}
          disabled={!myCompanies?.length}
        />
      )}
    </EmployeeControlWrapper>
  );
};

export default EmployeeControl;
