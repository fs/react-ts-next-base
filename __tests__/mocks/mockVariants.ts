import { VariantUnitKindEnum, VariantUnitQuantityKindEnum, WeekdayEnum } from 'graphql/types';

export const mockVariants = [
  {
    __typename: 'Variant' as const,
    currentPeriodDiscount: {
      amount: 2,
      endDate: '2029-12-20',
      id: '126',
      startDate: '2021-12-18',
    },
    currentWeeklyDiscount: {
      amount: 4,
      id: '13488',
      weekday: WeekdayEnum.Friday,
    },
    expirationDate: null,
    id: '336',
    height: 34,
    length: 123,
    width: 12,
    netWeight: 15,
    grossWeight: 18,
    minShipmentLot: 100,
    wholesalePrice: 8000,
    packingMaterial: null,
    deliveryCondition: {
      id: '45',
      comment: '',
      hazardClass: '',
      insuranceRequired: false,
    },
    periodDiscounts: [
      {
        id: '456',
        amount: 10,
        endDate: '20-10-2023',
        startDate: '20-10-2022',
      },
    ],
    price: 9000,
    soldQuantity: 100,
    stock: 1000000,
    variantPhotos: [
      {
        id: '128',
        imageUrl: '/images/products-mock/product.png',
      },
    ],
    variantCertificates: [
      {
        id: '1',
        attachmentUrl: '/images/products-mock/product.png',
        originalFilename: 'product.png',
      },
    ],
    variantInstructions: [
      {
        id: '1',
        attachmentUrl: '/images/products-mock/product.png',
        originalFilename: 'product.png',
      },
    ],
    variantProperties: [
      {
        __typename: 'DictionaryVariantProperty' as const,
        id: '331',
        property: {
          id: '19',
          name: 'Количество слоев',
          displayName: 'Количество слоев',
        },
        dictionaryPropertyOption: {
          id: '118',
          name: '2-слойная',
        },
      },
      {
        __typename: 'IntegerVariantProperty' as const,
        id: '126',
        property: {
          id: '4',
          name: 'Ширина',
          displayName: 'Количество слоев',
        },
        integerValue: 33,
      },
    ],
    weeklyDiscounts: [
      {
        id: '32',
        amount: 90,
        weekday: WeekdayEnum.Thursday,
      },
    ],
    discount: 5,
    discountPrice: 8000,
    discountWholesalePrice: 7000,
    unitKind: VariantUnitKindEnum.Item,
    unitQuantityKind: VariantUnitQuantityKindEnum.Item,
    unitQuantity: 1,
  },
];
