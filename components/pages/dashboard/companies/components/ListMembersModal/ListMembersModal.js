import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { useDestroyCompanyMember } from 'lib/apollo/hooks/actions/companyMember';
import { useMyEmployees } from 'lib/apollo/hooks/state/myEmployees';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import ModalWindow from 'components/shared/atoms/ModalWindow';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import Loader from 'components/shared/atoms/Loader';
import EditMemberAccessModal from '../EditMemberAccessModal';

import { Title, EmployeeItemWrapper, EmployeeEmail, ActionWrapper } from './styled';

const ListMembersModal = NiceModal.create(({ myCompanies }) => {
  const { visible, remove } = useModal();
  const { myEmployees, loading } = useMyEmployees();

  const [destroyMember] = useDestroyCompanyMember();
  const destroyMemberModal = useModal(SimpleModal);

  const showDeleteMember = ({ id: userId, email, companyMembers }) => {
    const companyIds = companyMembers?.map(({ company }) => company.id);

    destroyMemberModal.show({
      onSubmit: async () => {
        await destroyMember({ userId, companyIds });
      },
      title: 'Удаление пользователя',
      description: (
        <>
          Вы уверены что вы хотите удалить пользователя <strong>{email}</strong>
        </>
      ),
    });
  };

  const showEditMember = member => {
    const { companyMembers } = member;
    const memberCompanyIds = companyMembers.map(({ company }) => company.id);

    NiceModal.show(EditMemberAccessModal, {
      member,
      myCompanies,
      memberCompanies: myCompanies.map(({ id }) => ({
        id,
        checked: memberCompanyIds.includes(id),
      })),
    });
  };

  return (
    <ModalWindow isOpen={visible} setIsOpen={remove} $width="21rem">
      <Title data-testid="edit-member-modal-title" data-cy="edit-member-modal-title">
        Список пользователей
      </Title>
      {loading ? (
        <Loader />
      ) : (
        myEmployees.map(member => {
          const { id, email } = member;
          return (
            <EmployeeItemWrapper key={id} data-cy="employee-item">
              <EmployeeEmail>{email}</EmployeeEmail>
              <ActionWrapper>
                <Button
                  label="Удалить"
                  variant="hollow-primary"
                  iconType="leading"
                  icon={<Icon name="trash-bin" $color="blue" />}
                  testId={`delete-${id}`}
                  onClick={() => showDeleteMember(member)}
                />

                <Button
                  label="Редактировать"
                  variant="hollow-change"
                  iconType="leading"
                  icon={<Icon name="pencil" $color="orange" />}
                  onClick={() => showEditMember(member)}
                  testId={`edit-${id}`}
                />
              </ActionWrapper>
            </EmployeeItemWrapper>
          );
        })
      )}
    </ModalWindow>
  );
});

export default ListMembersModal;
