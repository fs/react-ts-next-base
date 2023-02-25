import React from 'react';
import { CompanyInfoFragment } from 'graphql/fragments/__generated__/companyInfo.generated';

export type TCompanyTemplate = {
  children: React.ReactNode;
  testId?: string;
  company: CompanyInfoFragment;
};
