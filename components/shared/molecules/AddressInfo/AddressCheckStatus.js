import React, { useMemo } from 'react';

import { getVerificationDeadline } from 'helpers';
import { CompanyLocationStatusEnum } from 'graphql/types';

import Icon from 'components/shared/atoms/Icon';

import { ItemAlertMessageWrapper } from './styled';
import { EAddressStatus } from './types';

const icon = {
  [EAddressStatus.AdminNotVerified]: <Icon name="timer" $size={22} $mr={16} $color="white" />,
  [EAddressStatus.NotVerified]: <Icon name="timer" $size={22} $mr={16} $color="white" />,
  [EAddressStatus.AdminRejected]: <Icon name="timer" $size={22} $mr={16} $color="white" />,
  [EAddressStatus.Rejected]: <Icon name="pencil" $mr={16} $size={20} $color="white" />,
};

const text = verificationDeadlineAt => ({
  [EAddressStatus.AdminNotVerified]: ` На проверку этой лицензии ${getVerificationDeadline(
    verificationDeadlineAt || new Date(),
  ).toLowerCase()}`,
  [EAddressStatus.NotVerified]: (
    <>
      Мы проверяем указанные вами данные <br /> Обычно это занимает не более 24 часов{' '}
    </>
  ),
  [EAddressStatus.AdminRejected]: 'Пользователь вносит запрошенные изменения',
  [EAddressStatus.Rejected]: (
    <>
      Внесите запрошенные <br /> администратором корректировки
    </>
  ),
});

const AddressCheckStatus = ({ rounded, isAdminAddresses, verificationDeadlineAt, status }) => {
  const addressStatus = useMemo(() => {
    switch (true) {
      case status === CompanyLocationStatusEnum.NotVerified && isAdminAddresses:
        return EAddressStatus.AdminNotVerified;
      case status === CompanyLocationStatusEnum.NotVerified && !isAdminAddresses:
        return EAddressStatus.NotVerified;
      case status === CompanyLocationStatusEnum.Rejected && isAdminAddresses:
        return EAddressStatus.AdminRejected;
      case status === CompanyLocationStatusEnum.Rejected && !isAdminAddresses:
        return EAddressStatus.Rejected;
      default:
        return null;
    }
  }, [status, isAdminAddresses, verificationDeadlineAt]);

  return (
    <ItemAlertMessageWrapper
      isAdminAddresses={isAdminAddresses}
      data-testid="address-check-status"
      status={status}
      rounded={rounded}
    >
      {icon[addressStatus]}
      <span>{text(verificationDeadlineAt)[addressStatus]}</span>
    </ItemAlertMessageWrapper>
  );
};

export default AddressCheckStatus;
