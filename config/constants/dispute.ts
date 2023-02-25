import { DisputeReasonEnum, DisputeStatusEnum } from 'graphql/types';

export const disputeReason = {
  [DisputeReasonEnum.NoTrackingInfo]: 'Нет информации об отслеживании',
  [DisputeReasonEnum.NotDeliveredOnTime]: 'Товар не доставлен в указанный срок',
  [DisputeReasonEnum.DeliveryServiceReturn]: 'Транспортная компания вернула заказ',
  [DisputeReasonEnum.InvalidAddress]: 'Заказ отправлен на неверный адрес',
  [DisputeReasonEnum.NotMeetDescription]: 'Товар не соответствует описанию',
  [DisputeReasonEnum.PoorQuality]: 'Проблема с качеством',
  [DisputeReasonEnum.ProductDamaged]: 'Товар поврежден',
  [DisputeReasonEnum.IncorrectQuantity]: 'Несоответствие количества',
  [DisputeReasonEnum.Fake]: 'Подделка',
  [DisputeReasonEnum.ComponentProblem]: 'Проблема с комплектующими',
};

export const disputeReasonsNotDelivered = [
  {
    value: DisputeReasonEnum.NoTrackingInfo,
    label: disputeReason[DisputeReasonEnum.NoTrackingInfo],
  },
  {
    value: DisputeReasonEnum.NotDeliveredOnTime,
    label: disputeReason[DisputeReasonEnum.NotDeliveredOnTime],
  },
  {
    value: DisputeReasonEnum.DeliveryServiceReturn,
    label: disputeReason[DisputeReasonEnum.DeliveryServiceReturn],
  },
  {
    value: DisputeReasonEnum.InvalidAddress,
    label: disputeReason[DisputeReasonEnum.InvalidAddress],
  },
];

export const disputeReasonsDelivered = [
  {
    value: DisputeReasonEnum.InvalidAddress,
    label: disputeReason[DisputeReasonEnum.InvalidAddress],
  },
  {
    value: DisputeReasonEnum.NotMeetDescription,
    label: disputeReason[DisputeReasonEnum.NotMeetDescription],
  },
  { value: DisputeReasonEnum.PoorQuality, label: disputeReason[DisputeReasonEnum.PoorQuality] },
  {
    value: DisputeReasonEnum.ProductDamaged,
    label: disputeReason[DisputeReasonEnum.ProductDamaged],
  },
  {
    value: DisputeReasonEnum.IncorrectQuantity,
    label: disputeReason[DisputeReasonEnum.IncorrectQuantity],
  },
  { value: DisputeReasonEnum.Fake, label: disputeReason[DisputeReasonEnum.Fake] },
  {
    value: DisputeReasonEnum.ComponentProblem,
    label: disputeReason[DisputeReasonEnum.ComponentProblem],
  },
];

export const disputeStatus = {
  [DisputeStatusEnum.Discussing]: 'Переговоры по спору',
  [DisputeStatusEnum.ProposalAccepted]: 'Принято решение',
  [DisputeStatusEnum.MedagregatorIntervened]: 'Вмешался Medagregator',
  [DisputeStatusEnum.Finished]: 'Спор закрыт',
  [DisputeStatusEnum.Canceled]: 'Спор отменен',
};
