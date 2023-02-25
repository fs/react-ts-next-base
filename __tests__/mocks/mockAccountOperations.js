import { mockPageInfo } from './mockPageInfo';
import { mockOrder } from './mockOrders';

export const mockAccountOperations = [
  {
    __typename: 'AccountOperation',
    id: '17',
    acceptedAt: null,
    amount: 335,
    operationType: 'INCREASE',
    originId: '74',
    originType: 'ORDER',
    status: 'PENDING',
    subject: 'PRODUCT_PAYMENT',
    origin: mockOrder,
  },
  {
    __typename: 'AccountOperation',
    id: '21',
    acceptedAt: null,
    amount: 320,
    operationType: 'INCREASE',
    originId: '80',
    originType: 'ORDER',
    status: 'PENDING',
    subject: 'PRODUCT_PAYMENT',
    origin: mockOrder,
  },
];

export const mockAccountOperationsData = {
  accountOperations: {
    edges: mockAccountOperations.map(accountOperation => ({ node: accountOperation, cursor: '' })),
    pageInfo: mockPageInfo,
  },
};
