import React, { useMemo } from 'react';

import { NOT_VERIFIED, REJECTED } from 'config/constants/status';

import Icon from 'components/shared/atoms/Icon';

import { CompanyCheck, IconWrap, CheckText } from './styled';

const CompanyCheckStatus = ({ status }) => {
  if (![NOT_VERIFIED, REJECTED].includes(status)) return <></>;

  const icon = useMemo(() => {
    switch (status) {
      case NOT_VERIFIED:
        return <Icon name="timer" $size={22} $color="white" />;
      case REJECTED:
        return <Icon name="pencil" $size={22} $color="white" />;
      default:
        return <></>;
    }
  }, [status]);

  const text = useMemo(() => {
    switch (status) {
      case NOT_VERIFIED:
        return (
          <>
            Мы проверяем вашу компанию
            <br /> Обычно это занимает не более
            <br /> 24 часов
          </>
        );
      case REJECTED:
        return (
          <>
            Внесите запрошенные
            <br /> администратором
            <br /> корректировки
          </>
        );
      default:
        return '';
    }
  }, [status]);

  return (
    <CompanyCheck status={status}>
      <IconWrap>{icon}</IconWrap>
      <CheckText>{text}</CheckText>
    </CompanyCheck>
  );
};

export default CompanyCheckStatus;
