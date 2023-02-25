import * as Types from '../../types';

import { gql } from '@apollo/client';
export type VariantFragment = {
  __typename?: 'Variant';
  discount: number;
  discountPrice?: number | null;
  discountWholesalePrice?: number | null;
  expirationDate?: any | null;
  grossWeight?: number | null;
  height?: number | null;
  id: string;
  length?: number | null;
  minShipmentLot?: number | null;
  netWeight?: number | null;
  unitKind: Types.VariantUnitKindEnum;
  unitQuantity?: number | null;
  unitQuantityKind?: Types.VariantUnitQuantityKindEnum | null;
  price?: number | null;
  soldQuantity: number;
  stock?: number | null;
  wholesalePrice?: number | null;
  width?: number | null;
  currentPeriodDiscount?: {
    __typename?: 'PeriodDiscount';
    amount: number;
    endDate: any;
    id: string;
    startDate: any;
  } | null;
  currentWeeklyDiscount?: {
    __typename?: 'WeeklyDiscount';
    amount: number;
    id: string;
    weekday: Types.WeekdayEnum;
  } | null;
  deliveryCondition?: {
    __typename?: 'DeliveryCondition';
    comment?: string | null;
    hazardClass?: string | null;
    id: string;
    insuranceRequired: boolean;
  } | null;
  packingMaterial?: { __typename?: 'PackingMaterial'; id: string; name: string } | null;
  periodDiscounts?: Array<{
    __typename?: 'PeriodDiscount';
    amount: number;
    endDate: any;
    id: string;
    startDate: any;
  }> | null;
  variantCertificates: Array<{
    __typename?: 'VariantCertificate';
    id: string;
    attachmentUrl: string;
    originalFilename?: string | null;
  }>;
  variantInstructions: Array<{
    __typename?: 'VariantInstruction';
    id: string;
    attachmentUrl: string;
    originalFilename?: string | null;
  }>;
  variantPhotos: Array<{ __typename?: 'VariantPhoto'; id: string; imageUrl: string }>;
  variantProperties: Array<
    | {
        __typename?: 'DictionaryVariantProperty';
        id: string;
        dictionaryPropertyOption: {
          __typename?: 'DictionaryPropertyOption';
          id: string;
          name: string;
        };
        property:
          | { __typename?: 'DictionaryProperty'; id: string; name: string; displayName: string }
          | {
              __typename?: 'IntegerProperty';
              unit?: string | null;
              id: string;
              name: string;
              displayName: string;
            }
          | { __typename?: 'StringProperty'; id: string; name: string; displayName: string };
      }
    | {
        __typename?: 'IntegerVariantProperty';
        integerValue: number;
        id: string;
        property:
          | { __typename?: 'DictionaryProperty'; id: string; name: string; displayName: string }
          | {
              __typename?: 'IntegerProperty';
              unit?: string | null;
              id: string;
              name: string;
              displayName: string;
            }
          | { __typename?: 'StringProperty'; id: string; name: string; displayName: string };
      }
    | {
        __typename?: 'StringVariantProperty';
        stringValue: string;
        id: string;
        property:
          | { __typename?: 'DictionaryProperty'; id: string; name: string; displayName: string }
          | {
              __typename?: 'IntegerProperty';
              unit?: string | null;
              id: string;
              name: string;
              displayName: string;
            }
          | { __typename?: 'StringProperty'; id: string; name: string; displayName: string };
      }
  >;
  weeklyDiscounts?: Array<{
    __typename?: 'WeeklyDiscount';
    amount: number;
    id: string;
    weekday: Types.WeekdayEnum;
  }> | null;
};

export const VariantFragmentDoc = gql`
  fragment Variant on Variant {
    currentPeriodDiscount {
      amount
      endDate
      id
      startDate
    }
    currentWeeklyDiscount {
      amount
      id
      weekday
    }
    deliveryCondition {
      comment
      hazardClass
      id
      insuranceRequired
    }
    discount
    discountPrice
    discountWholesalePrice
    expirationDate
    grossWeight
    height
    id
    length
    minShipmentLot
    netWeight
    unitKind
    unitQuantity
    unitQuantityKind
    packingMaterial {
      id
      name
    }
    periodDiscounts {
      amount
      endDate
      id
      startDate
    }
    price
    soldQuantity
    stock
    variantCertificates {
      id
      attachmentUrl
      originalFilename
    }
    variantInstructions {
      id
      attachmentUrl
      originalFilename
    }
    variantPhotos {
      id
      imageUrl
    }
    variantProperties {
      id
      property {
        id
        name
        displayName
        ... on IntegerProperty {
          unit
        }
      }
      ... on DictionaryVariantProperty {
        dictionaryPropertyOption {
          id
          name
        }
      }
      ... on IntegerVariantProperty {
        integerValue
      }
      ... on StringVariantProperty {
        stringValue
      }
    }
    weeklyDiscounts {
      amount
      id
      weekday
    }
    wholesalePrice
    width
  }
`;
