import { CompanyDirectionEnum, CompanyStatusEnum, CompanyTaxationSystemEnum } from 'graphql/types';

import { mockPageInfo } from './mockPageInfo';

export const mockCompany = {
  __typename: 'Company' as const,
  lastEmployeeMembers: [],
  id: '1',
  legalForm: {
    __typename: 'CompanyLegalForm' as const,
    id: 'opened_jsc',
    name: 'Открытое акционерное общество',
    shortName: 'ОАО',
  },
  inn: '1234567890',
  kpp: '123456789',
  officialName: 'FIRST COMPANY',
  unofficialName: 'company medagregator',
  deliveredOrdersCount: 10,
  directorFullName: 'Иванов Иван Иванович',
  deletedAt: null,
  deletionReason: null,
  legalAddress: 'Дзержинск пр. Чкалова',
  postcode: '606007',
  ogrn: '1234567890123',
  oktmo: '12345678',
  bankName: 'имя банка',
  checkingAccount: '12345678901234567890',
  correspondentAccount: '09876543210987654321',
  companyConfirmationRecords: [
    {
      id: '1',
      attachmentUrl: '/images/products-mock/product.png',
      originalFilename: 'product.png',
    },
  ],
  bic: '123456789',
  email: 'miasnikovdmitrii@gmail.com',
  phoneNumber: '9767240930',
  direction: CompanyDirectionEnum.Seller,
  logoUrl: 'http://api.medagregator.ru/uploads/company/1/a5a7d4ea7ddeb1982b59d3aef19e62ea.png',
  main: false,
  companyMembers: [
    {
      __typename: 'CompanyMember' as const,
      id: '1',
      user: {
        __typename: 'User' as const,
        id: '1',
      },
      role: {
        __typename: 'CompanyRole' as const,
        id: 'owner',
        name: 'Владелец',
      },
    },
  ],
  myRole: {
    __typename: 'CompanyRole' as const,
    id: 'owner',
    name: 'Владелец',
  },
  rejectedFields: [],
  rejectsCount: 0,
  sellableProductsCount: 4,
  status: CompanyStatusEnum.Verified,
  taxationSystem: CompanyTaxationSystemEnum.Osn,
  rating: null,
  receivedReviewsCount: 0,
  verificationDeadlineAt: null,
  blacklistedAt: null,
  createdAt: '2022-07-27T13:41:19Z',
};

export const mockCompanies = [mockCompany];

export const mockCompaniesData = {
  companies: {
    edges: mockCompanies.map(company => ({ node: company, cursor: null })),
    pageInfo: mockPageInfo,
  },
};

export const mockCustomerCompaniesData = {
  customerCompanies: {
    edges: mockCompanies.map(company => ({ node: company, cursor: null })),
    pageInfo: mockPageInfo,
  },
};
