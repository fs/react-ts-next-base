import {
  DeliveryMethodEnum,
  DiscountMethodEnum,
  OrderCheckoutStatusEnum,
  OrderExecutionStatusEnum,
  OrderInvoiceTypeEnum,
  OrderReservationStatusEnum,
  ShipmentMethodEnum,
  StatusEnum,
  WeekdayEnum,
} from 'graphql/types';

import { mockLocations } from '__tests__/mocks/mockLocations';
import { mockVariants } from './mockVariants';
import mockCompany from './mockCompany';
import { mockCategories } from './mockCategories';
import { mockPageInfo } from './mockPageInfo';
import { mockDispute } from './mockDispute';

export const mockOrder = {
  __typename: 'Order' as const,
  canLeaveReview: {
    message: null,
    reasons: null,
    value: true,
  },
  canRequestSupport: {
    message: null,
    reasons: null,
    value: true,
  },
  checkoutStatus: OrderCheckoutStatusEnum.Placed,
  companyLocation: mockLocations[0],
  companyReview: null,
  contract: {
    url: 'https://api.medagregator.ru/order_contracts/313.pdf',
    __typename: 'OrderContract' as const,
  },
  deliveryAddress: 'Россия, Республика Татарстан, Казань, Вахитовский район, Профсоюзная улица',
  deliveryMaxDate: null,
  deliveryMethod: DeliveryMethodEnum.Pickup,
  deliveryMinDate: null,
  deliveryPointId: null,
  deliveryPrice: 100,
  deliveryService: null,
  id: '17',
  itemPrice: 40,
  invoices: [
    {
      invoiceType: OrderInvoiceTypeEnum.Product,
      url: 'https://api.medagregator.ru/order_invoices/313/product.pdf',
      __typename: 'OrderInvoice' as const,
    },
    {
      invoiceType: OrderInvoiceTypeEnum.AgencyFee,
      url: 'https://api.medagregator.ru/order_invoices/313/agency_fee.pdf',
      __typename: 'OrderInvoice' as const,
    },
  ],
  pickupDate: '2021-12-31',
  placedAt: '2021-12-27T12:07:35Z',
  expiredAt: '2021-12-29T12:07:35Z',
  product: {
    __typename: 'Product' as const,
    company: mockCompany,
    category: {
      ...mockCategories[0],
      parent: {
        ...mockCategories[1],
        parent: {
          ...mockCategories[2],
          parent: {
            ...mockCategories[3],
          },
        },
      },
    },
    country: {
      __typename: 'Country' as const,
      id: '19',
      name: 'Афганистан',
    },
    id: '1',
    companyLocation: mockLocations[0],
    condition: null,
    deliveryCondition: null,
    dellinCourierAllowed: false,
    dellinDeliveryPointId: null,
    dellinFreightTypeId: null,
    description: '',
    disablePickup: false,
    discountMethod: DiscountMethodEnum.Sum,
    draft: false,
    draftStep: null,
    manufacturer: 'BAYER',
    name: 'Бинт эластичный VAROLAST с цинк. массой, 10см х 5м',
    periodDiscounts: [
      {
        amount: 10,
        endDate: '15.10.2021',
        id: '3',
        startDate: '10.10.2021',
      },
    ],
    productConfirmationRecords: [
      {
        attachmentUrl: 'test.url',
        originalFilename: 'product.png',
        id: '1',
      },
    ],
    productFreeDeliveries: [
      {
        city: {
          cityType: 'г',
          fiasId: '2',
          id: '1',
          kladrId: '2300200100000',
          name: 'Казань',
          region: 'Татарстан',
        },
        id: '1',
        minCost: 500,
        minDays: 10,
        maxDays: 20,
      },
    ],
    productPaidDeliveries: [
      {
        city: {
          cityType: 'г',
          fiasId: 'ecd4abbc-79eb-4dd9-b02d-b10760fbc4ff',
          id: '372',
          kladrId: '2300200100000',
          name: 'Абинск',
          region: 'Краснодарский край',
        },
        id: '31',
        maxWeight: 234,
        minWeight: 234,
        price: 234,
        minDays: 10,
        maxDays: 20,
      },
    ],
    sdekCourierAllowed: false,
    sdekDeliveryPointId: null,
    shipmentMethod: ShipmentMethodEnum.None,
    status: StatusEnum.Verified,
    template: false,
    deleted: false,
    vat: 0,
    weeklyDiscounts: [
      {
        amount: 0,
        id: '1',
        weekday: WeekdayEnum.Friday,
      },
    ],
    wholesaleLot: 0,
    favorite: true,
    favoritesCount: 12,
    rating: 1,
    receivedReviewsCount: 1,
  },
  productReview: null,
  quantity: 3,
  seller: mockCompany,
  buyer: mockCompany,
  variant: mockVariants[0],
  deletionReason: null,
  executionStatus: OrderExecutionStatusEnum.Confirmed,
  reservationStatus: OrderReservationStatusEnum.Confirmed,
  dispute: mockDispute,
  discount: 0,
  periodDiscount: {
    amount: 2,
    endDate: '2029-12-20',
    id: '126',
    startDate: '2021-12-18',
  },
  weeklyDiscount: {
    amount: 4,
    id: '13488',
    weekday: WeekdayEnum.Monday,
  },
};

export const mockDeletedOrder = {
  ...mockOrder,
  deletionReason: 'EXPIRED',
};

export const mockReservedOrder = {
  ...mockOrder,
  checkoutStatus: OrderCheckoutStatusEnum.Reserved,
};

export const mockOrders = [mockOrder];

export const mockOrdersData = {
  id: '1',
  orders: {
    edges: mockOrders.map(order => ({ cursor: '', node: order })),
    pageInfo: mockPageInfo,
  },
};

export const mockCustomerOrdersData = {
  customerOrders: {
    edges: mockOrders.map(order => ({ cursor: '', node: order })),
    pageInfo: mockPageInfo,
  },
};

export const mockOrdersSummaryData = {
  ordersSummary: {
    totalCount: 5,
  },
};

export const mockOrdersTotalCount = 5;
