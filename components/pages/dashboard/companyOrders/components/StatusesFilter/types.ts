import { DisputeStatusEnum, OrderExecutionStatusEnum } from 'graphql/types';
import { StatusesFilterBy } from './constants';

export type TStatusesFilter = {
  query: { [key: string]: string };
  filterBy: `${StatusesFilterBy}`;
  isUserBuyer: boolean;
};

export type TOption = {
  value: OrderExecutionStatusEnum | DisputeStatusEnum;
  label: string;
};
