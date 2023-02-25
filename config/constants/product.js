export const PRODUCT_TYPE = {
  NEW: 'NEW',
  EXISTED: 'EXISTED',
  DELETED: 'DELETED',
  REJECTED: 'REJECTED',
};
export const CONDITION_TYPE = {
  NEW: 'NEW',
  USED: 'USED',
};

export const CONDITION_DICTIONARY = {
  [CONDITION_TYPE.NEW]: 'Новый товар',
  [CONDITION_TYPE.USED]: 'Б/У товар',
};

export const CATEGORY_DEPTH_DICTIONARY = {
  0: 'Категория товара',
  1: 'Подкатегория товара',
  2: 'Раздел',
};
