import { VariantUnitKindEnum, VariantUnitQuantityKindEnum } from 'graphql/types';

export const DICTIONARY_PROPERTY = 'DictionaryProperty';
export const INTEGER_PROPERTY = 'IntegerProperty';

export const unitKinds = [
  { label: 'Поштучно', value: VariantUnitKindEnum.Item },
  { label: 'Упаковка', value: VariantUnitKindEnum.Pack },
];

export const quantityKinds = [
  { label: 'Штук', value: VariantUnitQuantityKindEnum.Item },
  { label: 'Пар', value: VariantUnitQuantityKindEnum.Pair },
];
