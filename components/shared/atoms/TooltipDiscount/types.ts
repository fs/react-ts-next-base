import { WeeklyDiscount, PeriodDiscount, Order } from 'graphql/types';
import { TMargin } from 'public/styles/config/margin';

export type TTooltipDiscount = TMargin & {
  periodDiscount?: PeriodDiscount | null;
  weeklyDiscount?: WeeklyDiscount | null;
  discount: Order['discount'];
};
