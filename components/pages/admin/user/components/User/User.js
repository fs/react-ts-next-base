import React from 'react';

import { ADMIN_COMPANY } from 'config/routes';
import { dateFormat, phoneFormatter } from 'helpers';

import Fieldset from 'components/shared/atoms/Fieldset';
import ActionLink from 'components/shared/atoms/ActionLink';

import {
  SectionColumn,
  SectionHeader,
  SectionRow,
  SectionWrapper,
  CompaniesTitle,
  NoCompaniesText,
} from './styled';

const User = ({ user }) => {
  const {
    fullName,
    email,
    createdAt,
    role: { name },
    phoneNumber,
    companyMembers,
  } = user;

  return (
    <SectionWrapper>
      <SectionHeader>Просмотр профиля пользователя</SectionHeader>
      <SectionRow justifyContent="flex-start">
        <SectionColumn justifyContent="flex-start">
          <Fieldset legend="ФИО" $width="100%">
            {fullName}
          </Fieldset>
          <Fieldset legend="Роль" $width="100%">
            {name}
          </Fieldset>
          <Fieldset legend="Дата регистрации на сайте" $width="100%">
            {dateFormat(createdAt)}
          </Fieldset>
          <Fieldset legend="e-mail" $width="100%">
            {email}
          </Fieldset>
          <Fieldset legend="Телефон" $width="100%">
            {phoneFormatter(phoneNumber)}
          </Fieldset>
        </SectionColumn>
        <SectionColumn justifyContent="flex-start">
          <CompaniesTitle>Список компаний пользователя</CompaniesTitle>
          {companyMembers.map(({ company }, id) => (
            <ActionLink
              label={company.officialName}
              key={`idx-${id}`}
              href={{ pathname: ADMIN_COMPANY, query: { companyId: company.id } }}
              $mb={8}
              size={14}
              $color="black"
            />
          ))}
          {companyMembers.length === 0 && <NoCompaniesText> Отсутсвуют </NoCompaniesText>}
        </SectionColumn>
      </SectionRow>
    </SectionWrapper>
  );
};

export default User;
