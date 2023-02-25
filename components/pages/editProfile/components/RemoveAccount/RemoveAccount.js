import React from 'react';
import { useModal } from '@ebay/nice-modal-react';

import { useDestroyUserAccount } from 'lib/apollo/hooks/actions/currentUser';

import SimpleModal from 'components/shared/molecules/Modal/SimpleModal';

import { Wrapper, RemoveAccountButton } from './styled';

const RemoveAccount = () => {
  const [destroyAccount] = useDestroyUserAccount();
  const destroyAccountModal = useModal(SimpleModal);

  const showRemoveAccount = () =>
    destroyAccountModal.show({
      onSubmit: async () => {
        await destroyAccount();
      },
      title: 'Удаление профиля',
      description:
        'Вы уверены что вы хотите удалить профиль? При удалении все данные будут утеряны.',
    });

  return (
    <Wrapper>
      <RemoveAccountButton onClick={showRemoveAccount}>Удалить аккаунт</RemoveAccountButton>
    </Wrapper>
  );
};

export default RemoveAccount;
