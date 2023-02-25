import { StatusEnum } from 'graphql/types';

export type TProductCardSimpleStatus = {
  verificationDeadlineAt: string;
  rejectsCount: number;
  status: StatusEnum;
  deleted: boolean;
};
