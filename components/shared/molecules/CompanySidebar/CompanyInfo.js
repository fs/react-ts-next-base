import React from 'react';

import LogoCompany from 'components/shared/atoms/LogoCompany';
import { getCompanyDirection } from 'config/constants/directions';

import { CompanyInfoWrapper, LogoWrapper, Name, CompanyStatus } from './styled';

const CompanyInfo = ({ company }) => {
  const { officialName, direction, legalForm } = company;

  return (
    <CompanyInfoWrapper>
      <LogoWrapper>
        <LogoCompany edit company={company} />
      </LogoWrapper>
      <Name>
        {legalForm?.shortName} “{officialName}”
      </Name>
      <CompanyStatus>
        <li>Статус: {getCompanyDirection(direction)}</li>
      </CompanyStatus>
    </CompanyInfoWrapper>
  );
};

export default CompanyInfo;
