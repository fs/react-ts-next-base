import React from 'react';

import Icon from 'components/shared/atoms/Icon';
import Rating from 'components/shared/atoms/Rating';
import LogoCompany from 'components/shared/atoms/LogoCompany';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import QuestionSellerModal from 'components/shared/molecules/QuestionSellerModal';

import { getCompanyDirection } from 'config/constants/directions';
import { BLACKLISTED } from 'config/constants/status';

import { dateFormat, phoneFormatter } from 'helpers';

import {
  Wrapper,
  InfoWrapper,
  Info,
  CompanyData,
  NameWrapper,
  Name,
  Direction,
  OfficialName,
  Contacts,
  ContactsItem,
  LogoWrapper,
  BlockingDate,
} from './styled';

const CompanyMainInfo = ({ company }) => {
  const {
    officialName,
    unofficialName,
    email,
    legalAddress,
    phoneNumber,
    direction,
    rating,
    status,
    blacklistedAt,
  } = company;
  const directionName = getCompanyDirection(direction);

  return (
    <Wrapper>
      <InfoWrapper>
        <Info>
          <LogoWrapper>
            <LogoCompany company={company} />
          </LogoWrapper>
          <CompanyData>
            <NameWrapper>
              <Name>{unofficialName}</Name>
              <Rating rating={rating} />
            </NameWrapper>

            <Direction>
              Статус: <strong>{directionName}</strong>
            </Direction>

            <OfficialName>Юридическое лицо: {officialName}</OfficialName>
          </CompanyData>
        </Info>

        {status === BLACKLISTED ? (
          <BlockingDate>{`Дата блокировки: ${dateFormat(blacklistedAt)}`}</BlockingDate>
        ) : (
          // https://www.pivotaltracker.com/story/show/184279049
          // <QuestionSellerModal />
          <></>
        )}
      </InfoWrapper>

      <Contacts>
        <ContactsItem>
          <Icon name="mail-circle" $color="blue" $size={30} $mr={12} />
          {email}
        </ContactsItem>
        <ContactsItem>
          <Icon name="phone-circle" $color="blue" $size={30} $mr={12} />
          {phoneFormatter(phoneNumber)}
        </ContactsItem>
        <ContactsItem>
          <Icon name="pin-circle" $color="blue" $size={30} $mr={12} />
          {legalAddress}
        </ContactsItem>
      </Contacts>
    </Wrapper>
  );
};

export default CompanyMainInfo;
