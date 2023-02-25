export const SELLER = 'SELLER';
export const BUYER = 'BUYER';

export const companyDirection = {
  [SELLER]: 'Продавец',
  [BUYER]: 'Покупатель',
};

export const getCompanyDirection = direction => companyDirection[direction];
