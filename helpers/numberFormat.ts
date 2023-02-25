// 1000000 => 1 000 000
export const numberFormat = (number?: number | null): string =>
  number ? new Intl.NumberFormat('ru-RU').format(number) : '0';
