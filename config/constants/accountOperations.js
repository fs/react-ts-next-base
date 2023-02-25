import { AccountOperationSubjectEnum } from 'graphql/types';

export const accountOperationsDictionary = {
  [AccountOperationSubjectEnum.ProductPayment]: 'Оплата товара',
  [AccountOperationSubjectEnum.ProductDelivery]: 'Доставка',
  [AccountOperationSubjectEnum.AgencyFee]: 'Агентское вознаграждение',
  [AccountOperationSubjectEnum.Deposit]: 'Пополнение счета',
  [AccountOperationSubjectEnum.Withdrawal]: 'Вывод средств',
  [AccountOperationSubjectEnum.DisputeFinished]: 'Спор завершен / Товар',
  [AccountOperationSubjectEnum.FinishedDisputeDelivery]: 'Спор завершен / Доставка',
};

export const ACCOUNT_OPERATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
};
