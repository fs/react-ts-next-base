import { ACCOUNT_OPERATION_STATUS } from 'config/constants/accountOperations';
import company from './mockCompany';
import { mockPageInfo } from './mockPageInfo';

export const mockTransfers = [
  {
    amount: 525,
    applicationUrl: 'https://api.medagregator.ru/transfer_withdrawals/1.pdf',
    company,
    id: '1',
    createdAt: '2022-02-17',
    transferType: 'WITHDRAWAL',
    vat: 0,
    vatType: 'TAXED',
    accountOperation: {
      status: ACCOUNT_OPERATION_STATUS.PENDING,
    },
    invoice: {
      url: 'https://api.medagregator.ru/transfer_withdrawals/1.pdf',
    },
    __typename: 'Transfer',
  },
  {
    amount: 1625,
    applicationUrl: 'https://api.medagregator.ru/transfer_withdrawals/1.pdf',
    company,
    id: '2',
    createdAt: '2021-01-15',
    transferType: 'WITHDRAWAL',
    vat: 0,
    vatType: 'TAXED',
    accountOperation: {
      status: ACCOUNT_OPERATION_STATUS.PENDING,
    },
    invoice: {
      url: 'https://api.medagregator.ru/transfer_withdrawals/2.pdf',
    },
    __typename: 'Transfer',
  },
];

export const mockTransfersData = {
  transfers: {
    edges: mockTransfers.map(transfer => ({
      node: transfer,
      cursor: '',
    })),
    pageInfo: mockPageInfo,
  },
};
