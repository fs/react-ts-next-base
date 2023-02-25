import {
  OrderExecutionStatusEnum,
  OrderCheckoutStatusEnum,
  OrderReservationStatusEnum,
} from 'graphql/types';

export const tabsConfig = {
  unformed: 'unformed',
  processing: 'processing',
  finished: 'finished',
} as const;

export const orderExecutionStatuses = {
  [tabsConfig.unformed]: [],
  [tabsConfig.processing]: [
    OrderExecutionStatusEnum.Confirmed,
    OrderExecutionStatusEnum.DisputeOpened,
    OrderExecutionStatusEnum.InAssembly,
    OrderExecutionStatusEnum.InTransit,
    OrderExecutionStatusEnum.MedagregatorIntervened,
    OrderExecutionStatusEnum.PaymentPending,
  ],
  [tabsConfig.finished]: [OrderExecutionStatusEnum.Delivered],
};

export const orderCheckoutStatus = {
  [tabsConfig.unformed]: OrderCheckoutStatusEnum.Reserved,
  [tabsConfig.processing]: undefined,
  [tabsConfig.finished]: undefined,
};

export const orderReservationStatuses = {
  [tabsConfig.unformed]: Object.values(OrderReservationStatusEnum),
  [tabsConfig.processing]: [],
  [tabsConfig.finished]: [],
};
