import { CompanyLocationStatusEnum } from 'graphql/types';

import { mockPageInfo } from './mockPageInfo';
import { mockLegalForms } from './mockCompany';

export const mockLocations = [
  {
    city: {
      cityType: 'г',
      fiasId: '2',
      id: '1',
      kladrId: '2300200100000',
      name: 'Казань',
      region: 'Татарстан',
    },
    address: 'Россия, Республика Татарстан, Казань, улица Рашида Вагапова, 11',
    status: CompanyLocationStatusEnum.Verified,
    id: '42',
    phoneNumber: '9178559022',
    comment: '',
    postcode: '123456',
    main: false,
    canBeDestroyed: true,
    canBeUpdated: false,
    verificationDeadlineAt: '2022-04-29T12:18:33Z',
    rejectionReason: 'потому что',
    company: {
      officialName: 'company medagregator',
      unofficialName: 'company medagregator',
      id: '1',
      legalForm: mockLegalForms[0],
    },
    companyLicenses: [
      {
        id: '1',
        number: '1234567',
        companyLicensePhotos: [
          {
            id: '1',
            imageUrl: 'photo.img',
          },
        ],
      },
    ],
    __typename: 'CompanyLocation' as const,
  },
  {
    city: {
      cityType: 'г',
      fiasId: '2',
      id: '1',
      kladrId: '2300200100000',
      name: 'Казань',
      region: 'Татарстан',
    },
    address: 'Россия, Республика Татарстан, Казань, Южногорская улица, 18А',
    status: CompanyLocationStatusEnum.NotVerified,
    id: '43',
    phoneNumber: '1234567899',
    comment: '',
    postcode: '123456',
    main: false,
    canBeDestroyed: false,
    canBeUpdated: true,
    rejectionReason: 'потому что',
    verificationDeadlineAt: '2022-04-29T12:18:33Z',
    company: {
      id: '1',
      officialName: 'company medagregator',
      unofficialName: 'company medagregator',
      legalForm: mockLegalForms[0],
    },
    companyLicenses: [
      {
        id: '2',
        number: '12345678',
        companyLicensePhotos: [
          {
            id: '2',
            imageUrl: 'logo.img',
          },
        ],
      },
    ],
    __typename: 'CompanyLocation' as const,
  },
];

export const mockCustomerCompanyLocationsData = {
  customerCompanyLocations: {
    edges: mockLocations.map(location => ({ node: location })),
    pageInfo: mockPageInfo,
  },
};
