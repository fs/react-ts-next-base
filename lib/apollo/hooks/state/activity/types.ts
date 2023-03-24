import { ActivityEvent } from 'graphql/types';

export type TActivity = {
  before?: string;
  after?: string;
  event?: ActivityEvent;
  pageSize: number;
};
