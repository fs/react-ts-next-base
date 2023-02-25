import React from 'react';

import CompanyInfo from './CompanyInfo';
import CompanyMenu from './CompanyMenu';

const CompanySidebar = ({ company }) => {
  return (
    <>
      <CompanyInfo company={company} />
      <CompanyMenu company={company} />
    </>
  );
};

export default CompanySidebar;
