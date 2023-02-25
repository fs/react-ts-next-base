import React from 'react';
import { verb, noun } from 'plural-ru';
import { differenceInHours } from 'date-fns';

import Icon from 'components/shared/atoms/Icon';
import Button from 'components/shared/atoms/Button';
import LogoCompany from 'components/shared/atoms/LogoCompany';

import { dateFormat, phoneFormatter } from 'helpers';
import { getStatus } from 'config/constants/status';
import { getCompanyDirection } from 'config/constants/directions';

import {
  AdminCompanyInfoWrapper,
  RowDetails,
  RowContacts,
  Timer,
  CompanyDetails,
  LogoWrapper,
  Col,
  Name,
  Direction,
  OfficialName,
  Contacts,
  ContactsItem,
  ActionWrapper,
  RegisteredAt,
} from './styled';

const AdminCompanyInfo = ({ company, route, showTime = true }) => {
  const {
    id: companyId,
    status: verifiedStatus,
    direction,
    officialName,
    legalForm: { shortName: legalFormShortName },
    unofficialName,
    phoneNumber,
    email,
    legalAddress,
    verificationDeadlineAt,
    rejectsCount,
    createdAt,
  } = company;
  const isCompanyVerified = getStatus(verifiedStatus);

  const currentTime = new Date();
  const verificationTime = new Date(verificationDeadlineAt);

  const diffHours = differenceInHours(verificationTime, currentTime);
  const showHour = diffHours > 0 ? diffHours : 0;

  const leftText = verb(showHour, 'Остался', 'Осталось', 'Осталось');
  const hourText = noun(showHour, 'час', 'часа', 'часов');

  return (
    <AdminCompanyInfoWrapper hasShadow={!!route}>
      <RowDetails>
        {!isCompanyVerified && showTime && (
          <Timer>
            <Icon name="timer" $color="orange" $size={32} />
            <div>
              {leftText} <br /> {showHour} {hourText}
            </div>
            {rejectsCount > 0 && (
              <div>
                Повторная
                <br />
                проверка
              </div>
            )}
          </Timer>
        )}

        <CompanyDetails>
          <LogoWrapper>
            <LogoCompany company={company} />
          </LogoWrapper>

          <Col>
            <Name>{unofficialName}</Name>
            <Direction>
              Статус:&nbsp;<strong>{getCompanyDirection(direction)}</strong>
            </Direction>
            <RegisteredAt>Дата регистрации: {dateFormat(createdAt)}</RegisteredAt>
            <OfficialName>
              Юридическое лицо: {legalFormShortName} “{officialName}”
            </OfficialName>
          </Col>
        </CompanyDetails>
      </RowDetails>

      <RowContacts>
        <Contacts>
          <ContactsItem>
            <Icon name="mail-circle" $size={30} $color="blue" $mr={14} />
            {email}
          </ContactsItem>
          <ContactsItem>
            <Icon name="phone-circle" $size={30} $color="blue" $mr={14} />
            {phoneFormatter(phoneNumber)}
          </ContactsItem>
          <ContactsItem>
            <Icon name="pin-circle" $size={30} $color="blue" $mr={14} />
            {legalAddress}
          </ContactsItem>
        </Contacts>

        {!!route && (
          <ActionWrapper>
            <Button
              label="Просмотреть"
              shape="rounded"
              size="small"
              href={{ pathname: route, query: { companyId } }}
            />
          </ActionWrapper>
        )}
      </RowContacts>
    </AdminCompanyInfoWrapper>
  );
};

export default AdminCompanyInfo;
