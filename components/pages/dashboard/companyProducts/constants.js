export const productTypes = {
  ACTIVE: 'ACTIVE',
  DELETED: 'DELETED',
  TEMPLATE: 'TEMPLATE',
  DRAFT: 'DRAFT',
};

export const productTitles = {
  [productTypes.ACTIVE]: 'Мои товары',
  [productTypes.DRAFT]: 'Черновики',
  [productTypes.DELETED]: 'Удаленные товары',
  [productTypes.TEMPLATE]: 'Шаблоны',
};
