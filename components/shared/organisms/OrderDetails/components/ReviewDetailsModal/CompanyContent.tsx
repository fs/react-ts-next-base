import React from 'react';

import Rating from 'components/shared/atoms/Rating';
import LogoCompany from 'components/shared/atoms/LogoCompany';

import { TCompanyContent } from './types';
import {
  CompanyWrapper,
  LogoWrapper,
  CompanyInfo,
  Row,
  UnofficialName,
  OfficialName,
} from './styled';

const CompanyContent = ({ company }: TCompanyContent) => {
  const {
    officialName,
    unofficialName,
    legalForm: { shortName: legalFormShortName },
    rating,
  } = company;

  return (
    <CompanyWrapper>
      <LogoWrapper>
        <LogoCompany company={company} />
      </LogoWrapper>
      <CompanyInfo>
        <Row>
          <UnofficialName>{unofficialName}</UnofficialName>
          <Rating rating={rating || 0} />
        </Row>
        <OfficialName>
          Юридическое лицо: {legalFormShortName} “{officialName}”
        </OfficialName>
      </CompanyInfo>
    </CompanyWrapper>
  );
};

export default CompanyContent;
