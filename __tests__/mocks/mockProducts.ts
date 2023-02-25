import { DiscountMethodEnum, ShipmentMethodEnum, StatusEnum, WeekdayEnum } from 'graphql/types';

import { mockLocations } from '__tests__/mocks/mockLocations';
import mockCompany from './mockCompany';
import { mockVariants } from './mockVariants';
import { mockCategories } from './mockCategories';

export const mockProduct = {
  __typename: 'Product' as const,
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
  company: mockCompany,
  country: {
    __typename: 'Country' as const,
    id: '19',
    name: 'Афганистан',
  },
  id: '1',
  variants: mockVariants,
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
      weekday: WeekdayEnum.Monday,
    },
  ],
  wholesaleLot: 0,
  favorite: true,
  favoritesCount: 12,
  receivedReviewsCount: 1,
  rating: 1,
  verificationDeadlineAt: null,
  rejectsCount: 0,
  rejectionMessage: '',
};

export const mockProducts = [
  {
    ...mockProduct,
    id: '1',
    manufacturer: 'njdfhjltk234234234 ^_^',
    name: 'товар товар товарный ^_^',
    variants: mockVariants.map(variant => ({
      ...variant,
      variantPhotos: [
        {
          __typename: 'VariantPhoto' as const,
          id: '96',
          imageUrl:
            'http://api.medagregator.ru/uploads/variant_photo/96/bd948d81b5d96b641a7d8a5639d7883b.png',
        },
      ],
    })),
  },
  {
    ...mockProduct,
    id: '6',
    manufacturer: '234234234 ^_^',
    name: '234234 ^_^',
    variants: [
      {
        ...mockVariants[0],
        variantPhotos: [
          {
            __typename: 'VariantPhoto' as const,
            id: '13',
            imageUrl:
              'http://api.medagregator.ru/uploads/variant_photo/13/b7c04bd3d69aede32c283dd49a4ba4fe.jpg',
          },
        ],
      },
    ],
  },
  {
    ...mockProduct,
    id: '8',
    manufacturer: '234234',
    name: '234',
    variants: mockVariants.map(variant => ({
      ...variant,
      variantPhotos: [
        {
          __typename: 'VariantPhoto' as const,
          id: '12',
          imageUrl:
            'http://api.medagregator.ru/uploads/variant_photo/12/e95e9243e2a5cd87d09c490cb981cd40.jpg',
        },
      ],
    })),
  },
  {
    ...mockProduct,
    id: '65',
    manufacturer: '234',
    name: '18',
    variants: mockVariants.map(variant => ({
      ...variant,
      variantPhotos: [],
    })),
  },
];

export const mockTotalCount = 5;
