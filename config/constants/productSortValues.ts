import { ProductOrderEnum } from '../../graphql/types';

export const productSortValues = [
  { value: '', label: 'По умолчанию' },
  { value: ProductOrderEnum.PriceAsc, label: 'По возрастанию цены' },
  { value: ProductOrderEnum.PriceDesc, label: 'По убыванию цены' },
  { value: ProductOrderEnum.Rating, label: 'По рейтингу товара' },
  { value: ProductOrderEnum.TimesOrdered, label: 'Самые продаваемые' },
];
