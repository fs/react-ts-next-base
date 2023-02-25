import { DisputeStatusEnum, OrderExecutionStatusEnum } from 'graphql/types';

export enum StatusesFilterBy {
  executionStatuses = 'executionStatuses',
  disputeStatuses = 'disputeStatuses',
}

export const options = {
  [StatusesFilterBy.executionStatuses]: [
    { value: OrderExecutionStatusEnum.PaymentPending, label: 'Не оплаченные' },
    { value: OrderExecutionStatusEnum.Confirmed, label: 'Подтвержденные' },
    { value: OrderExecutionStatusEnum.InAssembly, label: 'В сборке' },
    { value: OrderExecutionStatusEnum.InTransit, label: 'В пути' },
    { value: OrderExecutionStatusEnum.DisputeOpened, label: 'Открыт спор' },
    {
      value: OrderExecutionStatusEnum.MedagregatorIntervened,
      label: 'Вмешался Medagregator',
    },
    { value: OrderExecutionStatusEnum.Delivered, label: 'Доставлен' },
  ],
  [StatusesFilterBy.disputeStatuses]: [
    { value: DisputeStatusEnum.Discussing, label: 'Переговоры по спору' },
    { value: DisputeStatusEnum.ProposalAccepted, label: 'Принято решение' },
    { value: DisputeStatusEnum.MedagregatorIntervened, label: 'Вмешался Medagregator' },
    { value: DisputeStatusEnum.Finished, label: 'Спор закрыт' },
    { value: DisputeStatusEnum.Canceled, label: 'Спор отменен' },
  ],
};

export const labelAll = {
  [StatusesFilterBy.executionStatuses]: 'Все заказы',
  [StatusesFilterBy.disputeStatuses]: 'Все споры',
};
