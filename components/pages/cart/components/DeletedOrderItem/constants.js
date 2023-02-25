export const deletionReasons = {
  EXPIRED: 'EXPIRED',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
};

export const reasonTitles = {
  [deletionReasons.EXPIRED]: 'прошло 24 часа',
  [deletionReasons.OUT_OF_STOCK]: 'закончился у продавца',
};
