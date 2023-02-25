import { CompanyInfoFragment } from 'graphql/fragments/__generated__/companyInfo.generated';
import { TWidth } from 'public/styles/config/width';

export type TLogoWrapper = {
  edit: boolean;
};

export type TLogoCompany = TWidth & {
  edit?: boolean;
  company: CompanyInfoFragment;
};
