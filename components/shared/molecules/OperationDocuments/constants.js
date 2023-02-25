export const orderInvoiceType = {
  PRODUCT: 'PRODUCT',
  AGENCY_FEE: 'AGENCY_FEE',
  DELIVERY: 'DELIVERY',
  CONTRACT: 'CONTRACT',
  WITHDRAWAL: 'WITHDRAWAL',
  APPLICATION: 'APPLICATION',
};

export const orderInvoiceTitles = {
  [orderInvoiceType.PRODUCT]: 'Счет / Товар',
  [orderInvoiceType.AGENCY_FEE]: 'Счет / Агентские услуги',
  [orderInvoiceType.DELIVERY]: 'Счет / Доставка',
  [orderInvoiceType.CONTRACT]: 'Электронный договор',
  [orderInvoiceType.WITHDRAWAL]: 'Счет / Вывод средств',
  [orderInvoiceType.APPLICATION]: 'Заявление',
};
