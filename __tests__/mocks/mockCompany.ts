import { CompanyDirectionEnum, CompanyStatusEnum, CompanyTaxationSystemEnum } from 'graphql/types';

export const mockLegalForms = [
  {
    __typename: 'CompanyLegalForm' as const,
    id: 'llc',
    name: 'Общество с ограниченной ответственностью',
    shortName: 'ООО',
  },
  {
    __typename: 'CompanyLegalForm' as const,
    id: 'sole_proprietor',
    name: 'Индивидуальный предприниматель',
    shortName: 'ИП',
  },
];

const company = {
  __typename: 'Company' as const,
  id: '1',
  direction: CompanyDirectionEnum.Seller,
  legalForm: mockLegalForms[0],
  inn: '1234567890',
  kpp: '123456789',
  officialName: 'ООО Первая компания',
  unofficialName: 'РК',
  deliveredOrdersCount: 10,
  directorFullName: 'Иванов Иван Иванович',
  legalAddress: 'г. Москва, ул. Пролетарская, д. 17',
  postcode: '123456',
  ogrn: '1234567890123',
  oktmo: '12345678',
  bankName: 'Банк',
  checkingAccount: '12345678901234567890',
  correspondentAccount: '09876543210987654321',
  lastEmployeeMembers: [],
  companyConfirmationRecords: [
    {
      id: '1',
      attachmentUrl: '/images/products-mock/product.png',
      originalFilename: 'product.png',
    },
  ],
  bic: '123456789',
  email: 'test.company@test.com',
  phoneNumber: '1234567890',
  logoUrl: '/images/products-mock/product.png',
  main: true,
  companyMembers: [
    {
      __typename: 'CompanyMember' as const,
      id: '12',
      user: {
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
    id: '45',
    name: 'owner',
  },
  rejectedFields: [],
  rejectsCount: 0,
  sellableProductsCount: 5,
  status: CompanyStatusEnum.Verified,
  taxationSystem: CompanyTaxationSystemEnum.Osn,
  rating: null,
  receivedReviewsCount: 0,
  verificationDeadlineAt: null,
  deletedAt: null,
  deletionReason: null,
  blacklistedAt: null,
  createdAt: '2022-07-27T13:41:19Z',
};

export const mockCompanyIndividualEntrepreneur = {
  ...company,
  legalForm: mockLegalForms[1],
};

export const mockBannedCompany = {
  ...company,
  deletionReason: 'BANNED',
  deletedAt: '10102022',
};

export default company;
