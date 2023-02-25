import { mockVariants } from './mockVariants';
import { mockMyCompanies } from './mockMyCompanies';
import { mockLocations } from './mockLocations';
import { mockCategories } from './mockCategories';
import { mockPageInfo } from './mockPageInfo';

const mockMyProduct = {
  __typename: 'Product',
  canAddToPriorityList: true,
  canRemoveFromPriorityList: false,
  prioritized: false,
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
  company: mockMyCompanies[0],
  companyLocation: mockLocations[0],
  condition: null,
  country: {
    id: '12',
    name: 'Россия',
  },
  deliveryCondition: null,
  dellinCourierAllowed: false,
  dellinDeliveryPointId: null,
  dellinFreightTypeId: null,
  description: '',
  disablePickup: false,
  discountMethod: 'SUM',
  draft: true,
  draftStep: 'DELIVERY_CONDITIONS',
  id: 1,
  manufacturer: 'BAYER',
  name: 'Бинт эластичный VAROLAST с цинк. массой, 10см х 5м',
  periodDiscounts: {
    amount: '10',
    endDate: '15.10.2021',
    id: '3',
    startDate: '10.10.2021',
  },
  productConfirmationRecords: {
    attachmentUrl: 'test.url',
    originalFilename: 'product.png',
    id: '1',
  },
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
      minCost: '500',
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
  shipmentMethod: 'NONE',
  status: 'VERIFIED',
  template: false,
  deleted: false,
  variants: mockVariants,
  vat: '',
  weeklyDiscounts: [
    {
      amount: '',
      id: '1',
      weekday: '',
    },
  ],
  wholesaleLot: '',
  favorite: 'true',
  favoritesCount: 12,
  receivedReviewsCount: 1,
  rating: 1,
  verificationDeadlineAt: null,
  rejectsCount: 0,
  rejectionMessage: '',
};

const mockMyDeletedProduct = {
  __typename: 'Product',
  canAddToPriorityList: true,
  canRemoveFromPriorityList: false,
  prioritized: false,
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
  company: mockMyCompanies[0],
  companyLocation: null,
  condition: null,
  country: {
    id: '12',
    name: 'Россия',
  },
  deliveryCondition: null,
  dellinCourierAllowed: false,
  dellinDeliveryPointId: null,
  dellinFreightTypeId: null,
  description: '',
  disablePickup: false,
  discountMethod: 'SUM',
  draft: true,
  draftStep: 'DELIVERY_CONDITIONS',
  id: 2,
  manufacturer: 'BAYER',
  name: 'Бинт эластичный VAROLAST с цинк. массой, 10см х 5м',
  periodDiscounts: {
    amount: '10',
    endDate: '15.10.2021',
    id: '3',
    startDate: '10.10.2021',
  },
  productConfirmationRecords: {
    attachmentUrl: 'test.url',
    originalFilename: 'product.png',
    id: '1',
  },
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
      minCost: '500',
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
  shipmentMethod: null,
  status: 'VERIFIED',
  template: false,
  deleted: true,
  variants: mockVariants,
  vat: '',
  weeklyDiscounts: [
    {
      amount: '',
      id: '1',
      weekday: '',
    },
  ],
  wholesaleLot: '',
  favorite: 'true',
  favoritesCount: 12,
  receivedReviewsCount: 1,
  rating: 1,
  verificationDeadlineAt: null,
  rejectsCount: 0,
  rejectionMessage: '',
};

export const mockMyProducts = [mockMyProduct, mockMyDeletedProduct];

export const mockMyProductsData = {
  myProducts: {
    edges: mockMyProducts.map(product => ({ cursor: '', node: product })),
    pageInfo: mockPageInfo,
  },
};

export const mockProductsData = {
  products: {
    edges: mockMyProducts.map(product => ({ cursor: '', node: product })),
    pageInfo: mockPageInfo,
  },
};

export const mockMyFavoriteProductsData = {
  favoriteProducts: {
    edges: mockMyProducts.map(product => ({ node: product })),
    pageInfo: mockPageInfo,
  },
};
