import React from 'react';
import { useModal } from '@ebay/nice-modal-react';

import { useDestroyAdmin } from 'lib/apollo/hooks/actions/admin';

import Button from 'components/shared/atoms/Button';
import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

const RemoveAdmin = ({ admin }) => {
  const { id, email } = admin;

  const [destroyAdmin] = useDestroyAdmin({ userId: id, email });
  const destroyAdminModal = useModal(SimpleModal);

  const showDestroyAdmin = () =>
    destroyAdminModal.show({
      roundedButton: true,
      onSubmit: async () => {
        await destroyAdmin();
      },
      title: 'Удаление аккаунта',
      description: (
        <>
          Вы уверены что хотите удалить
          <br /> аккаунт выбранного
          <br /> администратора? При удалении все
          <br /> данные будут утеряны.
        </>
      ),
      acceptText: 'Удалить',
    });

  return (
    <Button
      label="Удалить"
      $width="8.75rem"
      shape="rounded"
      size="small"
      onClick={showDestroyAdmin}
      testId={`destroy-admin-${id}`}
    />
  );
};

export default RemoveAdmin;
