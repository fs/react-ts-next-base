import React from 'react';
import { useModal } from '@ebay/nice-modal-react';
import ActionLink from 'components/shared/atoms/ActionLink';
import SupportRequestModal from 'components/shared/molecules/SupportRequestModal';

import EditEmail from '../EditEmail';
import EditPhoneNumber from '../EditPhoneNumber';

import { RightColWrapper } from './styled';

const RightCol = ({ user }) => {
  const { email, phoneNumber } = user || {};
  const supportRequestModal = useModal(SupportRequestModal);

  const onSupportRequestLinkClick = async () => {
    await supportRequestModal.show({});
  };

  return (
    <RightColWrapper>
      <strong>Профиль</strong>
      <EditEmail email={email} />
      <EditPhoneNumber phoneNumber={phoneNumber} />
      <ActionLink size={14} $color="grey" onClick={onSupportRequestLinkClick}>
        Обратиться в поддержку
      </ActionLink>
    </RightColWrapper>
  );
};

export default RightCol;
