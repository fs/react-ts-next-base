import React, { useState } from 'react';

import useCurrentUser from 'hooks/useCurrentUser';

import userHasAccess from 'rbac/userHasAccess';
import { withdrawalAccountRule } from 'rbac/rules';

import Button from 'components/shared/atoms/Button';
import ModalWindow from 'components/shared/atoms/ModalWindow';

import AccountForm from '../AccountForm';

import { operationTypes } from '../../constants';

const ModalWithdrawal = ({ company, balance }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useCurrentUser();

  const isDisabledButton = !userHasAccess(user?.role.id, withdrawalAccountRule) || balance <= 0;

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  const title = 'Вывод средств с Аналитического счета на р/с вашей компании';
  const buttonText = 'Вывести средства';

  return (
    <>
      <Button label="Вывести средства" onClick={onOpenModal} disabled={isDisabledButton} />

      <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} $width="22.5rem">
        <AccountForm
          title={title}
          balance={balance}
          buttonText={buttonText}
          company={company}
          operation={operationTypes.WITHDRAWAL}
          onCloseModal={onCloseModal}
        />
      </ModalWindow>
    </>
  );
};

export default ModalWithdrawal;
