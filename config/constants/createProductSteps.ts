import { ProductDraftStepEnum } from 'graphql/types';

export const BASIC = 'BASIC';
export const PROPERTIES = 'PROPERTIES';
export const ADDRESS = 'ADDRESS';
export const DELIVERY_CONDITIONS = 'DELIVERY_CONDITIONS';
export const DELIVERY = 'DELIVERY';
export const PRICES = 'PRICES';
export const DISCOUNTS = 'DISCOUNTS';

export const draftSteps = [
  ProductDraftStepEnum.Basic,
  ProductDraftStepEnum.Properties,
  ProductDraftStepEnum.Address,
  ProductDraftStepEnum.DeliveryConditions,
  ProductDraftStepEnum.Delivery,
  ProductDraftStepEnum.Prices,
  ProductDraftStepEnum.Discounts,
];
