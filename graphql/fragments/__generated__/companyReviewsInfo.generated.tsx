import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyInfoFragmentDoc } from './companyInfo.generated';
export type CompanyReviewsInfoFragment = {
  __typename?: 'CompanyReview';
  companyBody: string;
  companyRating: number;
  id: string;
  createdAt: any;
  buyer: {
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
  seller: {
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
};

export const CompanyReviewsInfoFragmentDoc = gql`
  fragment CompanyReviewsInfo on CompanyReview {
    buyer {
      ...CompanyInfo
    }
    companyBody
    companyRating
    id
    createdAt
    seller {
      ...CompanyInfo
    }
  }
  ${CompanyInfoFragmentDoc}
`;
