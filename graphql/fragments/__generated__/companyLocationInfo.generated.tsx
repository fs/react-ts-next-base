import * as Types from '../../types';

import { gql } from '@apollo/client';
import { CompanyLegalFormFragmentDoc } from './legalFormInfo.generated';
export type CompanyLocationFragment = {
  __typename?: 'CompanyLocation';
  status: Types.CompanyLocationStatusEnum;
  address?: string | null;
  comment?: string | null;
  id: string;
  canBeDestroyed: boolean;
  canBeUpdated: boolean;
  main: boolean;
  phoneNumber?: string | null;
  postcode?: string | null;
  rejectionReason?: string | null;
  verificationDeadlineAt?: any | null;
  city: {
    __typename?: 'City';
    cityType: string;
    fiasId: string;
    id: string;
    kladrId: string;
    name: string;
    region: string;
  };
  companyLicenses: Array<{
    __typename?: 'CompanyLocationLicense';
    id: string;
    number: string;
    companyLicensePhotos?: Array<{
      __typename?: 'CompanyLicensePhoto';
      id: string;
      imageUrl: string;
    }> | null;
  }>;
  company: {
    __typename?: 'Company';
    id: string;
    officialName: string;
    unofficialName: string;
    legalForm: { __typename?: 'CompanyLegalForm'; id: string; name: string; shortName: string };
  };
};

export const CompanyLocationFragmentDoc = gql`
  fragment CompanyLocation on CompanyLocation {
    status
    city {
      cityType
      fiasId
      id
      kladrId
      name
      region
    }
    address
    comment
    id
    canBeDestroyed
    canBeUpdated
    main
    phoneNumber
    postcode
    rejectionReason
    companyLicenses {
      id
      number
      companyLicensePhotos {
        id
        imageUrl
      }
    }
    company {
      id
      officialName
      unofficialName
      legalForm {
        ...CompanyLegalForm
      }
    }
    verificationDeadlineAt
  }
  ${CompanyLegalFormFragmentDoc}
`;
