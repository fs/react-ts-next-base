import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyInfoFragmentDoc } from './companyInfo.generated';
export type TransferInfoFragment = {
  __typename?: 'Transfer';
  amount: number;
  applicationUrl: string;
  createdAt: any;
  id: string;
  transferType: Types.TransferTypeEnum;
  vat: number;
  vatType: Types.TransferVatTypeEnum;
  accountOperation: { __typename?: 'AccountOperation'; status: Types.AccountOperationStatusEnum };
  company: {
    __typename?: 'Company';
    id: string;
    inn: string;
    kpp: string;
    officialName: string;
    unofficialName: string;
    deliveredOrdersCount?: number | null;
    directorFullName: string;
    legalAddress: string;
    postcode: string;
    ogrn: string;
    oktmo: string;
    bankName: string;
    checkingAccount: string;
    correspondentAccount: string;
    bic: string;
    email: string;
    phoneNumber: string;
    direction: Types.CompanyDirectionEnum;
    logoUrl: string;
    main: boolean;
    rejectsCount: number;
    sellableProductsCount: number;
    status: Types.CompanyStatusEnum;
    taxationSystem?: Types.CompanyTaxationSystemEnum | null;
    rating?: number | null;
    receivedReviewsCount: number;
    createdAt: any;
    verificationDeadlineAt?: any | null;
    deletedAt?: any | null;
    deletionReason?: Types.CompanyDeletionReasonEnum | null;
    blacklistedAt?: any | null;
    legalForm: { __typename?: 'CompanyLegalForm'; id: string; name: string; shortName: string };
    companyConfirmationRecords: Array<{
      __typename?: 'ConfirmationRecord';
      id: string;
      attachmentUrl: string;
      originalFilename?: string | null;
    }>;
    companyMembers: Array<{
      __typename?: 'CompanyMember';
      id: string;
      user: { __typename?: 'User'; id: string };
      role: { __typename?: 'CompanyRole'; id: string; name: string };
    }>;
    myRole?: { __typename?: 'CompanyRole'; id: string; name: string } | null;
    rejectedFields: Array<{
      __typename?: 'CompanyRejectedField';
      comment: string;
      name: Types.CompanyFieldEnum;
    }>;
    lastEmployeeMembers: Array<{
      __typename?: 'CompanyMember';
      id: string;
      user: { __typename?: 'User'; id: string; email: string };
    }>;
  };
  invoice?: { __typename?: 'TransferInvoice'; url: string } | null;
};

export const TransferInfoFragmentDoc = gql`
  fragment TransferInfo on Transfer {
    amount
    applicationUrl
    accountOperation {
      status
    }
    createdAt
    id
    transferType
    vat
    vatType
    company {
      ...CompanyInfo
    }
    invoice {
      url
    }
  }
  ${CompanyInfoFragmentDoc}
`;
