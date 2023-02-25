import { EXECUTION_STATUS } from 'config/constants/executionStatus';

export const documentsTypes = {
  ALL: 'ALL',
  IN_TRANSIT: EXECUTION_STATUS.IN_TRANSIT,
  DELIVERED: EXECUTION_STATUS.DELIVERED,
};

export const documentsTitles = {
  [documentsTypes.ALL]: 'Все',
  [documentsTypes.IN_TRANSIT]: 'В пути',
  [documentsTypes.DELIVERED]: 'Доставленные',
};
