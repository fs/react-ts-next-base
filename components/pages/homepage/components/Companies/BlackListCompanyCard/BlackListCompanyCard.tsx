import React from 'react';

import { dateFormat } from 'helpers';
import {
  CompanyCardWrapper,
  LogoWrapper,
  Delimiter,
  Description,
  BlockingDate,
  OfficialCompanyName,
  TextOverflow,
  UnofficialCompanyName,
  Logo,
} from './styled';
import { TBlackListCompanyCard } from './types';

const BlackListCompanyCard = ({ company }: TBlackListCompanyCard) => {
  const { unofficialName, officialName, logoUrl, blacklistedAt } = company;

  return (
    <CompanyCardWrapper>
      <LogoWrapper>
        <Logo alt={`${officialName}`} src={logoUrl} />
      </LogoWrapper>

      <Description>
        <TextOverflow>
          <UnofficialCompanyName>{unofficialName}</UnofficialCompanyName>
          <OfficialCompanyName>{officialName}</OfficialCompanyName>
        </TextOverflow>
        <Delimiter />
        <BlockingDate>Дата блокировки: {dateFormat(blacklistedAt)}</BlockingDate>
      </Description>
    </CompanyCardWrapper>
  );
};

export default BlackListCompanyCard;
