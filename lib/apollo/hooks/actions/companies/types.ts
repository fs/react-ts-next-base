import { CompanyInfoFragment } from 'graphql/fragments/__generated__/companyInfo.generated';

export type TCreateCompany = {
  onSubmit?: (company?: CompanyInfoFragment | null) => void;
};

export type TDestroyCompany = {
  companyName: string;
  companyId: string;
  onSubmit: () => void;
};

export type TUpdateCompanyData = {
  companyId: string;
};

export type TUnbanCompany = {
  onSubmit: () => void;
};

export type TBanCompany = {
  companyName: string;
  onSubmit: () => void;
};

export type TRemoveCompanyFromBlacklistInput = {
  companyName: string;
  onSubmit: () => void;
};

export type TAddCompanyToBlackList = {
  companyName: string;
  onSubmit: () => void;
};

export type TUpdateRejectedCompany = {
  companyId: string;
};

export type TRejectCompany = {
  companyId: string;
  companyName: string;
  onSubmit: () => void;
};

export type TCreateWithdrawal = {
  companyId: string;
};

export type TCompanyEdge = {
  node: CompanyInfoFragment;
};
