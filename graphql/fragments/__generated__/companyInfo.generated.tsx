import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyLegalFormFragmentDoc } from './legalFormInfo.generated';
export type CompanyInfoFragment = {
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

export const CompanyInfoFragmentDoc = gql`
  fragment CompanyInfo on Company {
    id
    legalForm {
      ...CompanyLegalForm
    }
    inn
    kpp
    officialName
    unofficialName
    deliveredOrdersCount
    directorFullName
    legalAddress
    postcode
    ogrn
    oktmo
    bankName
    checkingAccount
    correspondentAccount
    companyConfirmationRecords {
      id
      attachmentUrl
      originalFilename
    }
    bic
    email
    phoneNumber
    direction
    logoUrl
    main
    companyMembers {
      id
      user {
        id
      }
      role {
        id
        name
      }
    }
    myRole {
      id
      name
    }
    rejectedFields {
      comment
      name
    }
    rejectsCount
    sellableProductsCount
    status
    taxationSystem
    rating
    receivedReviewsCount
    createdAt
    verificationDeadlineAt
    lastEmployeeMembers {
      id
      user {
        id
        email
      }
    }
    deletedAt
    deletionReason
    blacklistedAt
  }
  ${CompanyLegalFormFragmentDoc}
`;
