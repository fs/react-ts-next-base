import { mockPageInfo } from './mockPageInfo';

export const mockCustomerAccountOperations = [
  {
    __typename: 'AccountOperation',
    id: '7',
    acceptedAt: null,
    amount: 5590,
    operationType: 'INCREASE',
    originId: '61',
    originType: 'ORDER',
    status: 'PENDING',
    subject: 'PRODUCT_PAYMENT',
  },
  {
    __typename: 'AccountOperation',
    id: '9',
    acceptedAt: null,
    amount: 585,
    operationType: 'INCREASE',
    originId: '63',
    originType: 'ORDER',
    status: 'PENDING',
    subject: 'PRODUCT_PAYMENT',
  },
  {
    __typename: 'AccountOperation',
    id: '11',
    acceptedAt: null,
    amount: 780,
    operationType: 'INCREASE',
    originId: '64',
    originType: 'ORDER',
    status: 'PENDING',
    subject: 'PRODUCT_PAYMENT',
  },
  {
    __typename: 'AccountOperation',
    id: '13',
    acceptedAt: null,
    amount: 325,
    operationType: 'INCREASE',
    originId: '65',
    originType: 'ORDER',
    status: 'PENDING',
    subject: 'PRODUCT_PAYMENT',
  },
  {
    __typename: 'AccountOperation',
    id: '178',
    acceptedAt: null,
    amount: 18327,
    operationType: 'INCREASE',
    originId: '276',
    originType: 'ORDER',
    status: 'ACCEPTED',
    subject: 'PRODUCT_PAYMENT',
  },
];

export const mockCustomerAccountOperationsData = {
  customerAccountOperations: {
    edges: mockCustomerAccountOperations.map(customerAccountOperations => ({
      node: customerAccountOperations,
      cursor: '',
    })),
    pageInfo: mockPageInfo,
  },
};
