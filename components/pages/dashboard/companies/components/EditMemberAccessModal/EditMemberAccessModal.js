import React, { useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { useUpdateCompanyMember } from 'lib/apollo/hooks/actions/companyMember';

import ModalWindow from 'components/shared/atoms/ModalWindow';

import MemberForm from '../MemberForm';

const EditMemberAccessModal = NiceModal.create(({ member, myCompanies, memberCompanies }) => {
  const { visible, remove } = useModal();
  const { id: userId, email } = member;

  const [updateCompanyMember] = useUpdateCompanyMember({ email });
  const [checkedCompanies, setCheckedCompanies] = useState(memberCompanies);

  const title = 'Редактирование доступа к компаниям';
  const submitLabel = 'Подтвердить';
  const checkboxTitle = 'Скорректируйте к каким компаниям у пользователя будет доступ';

  const onSubmit = async () => {
    const selectedCompanies = checkedCompanies.filter(({ checked }) => checked).map(({ id }) => id);
    await updateCompanyMember({ userId, companyIds: selectedCompanies });
    remove();
  };

  const form = {
    onSubmit,
    title,
    submitLabel,
    checkboxTitle,
  };

  return (
    <ModalWindow isOpen={visible} setIsOpen={remove} $width="26.5rem">
      <MemberForm
        form={form}
        checkedCompanies={checkedCompanies}
        companiesList={myCompanies}
        setCheckedCompanies={setCheckedCompanies}
      />
    </ModalWindow>
  );
});

export default EditMemberAccessModal;
