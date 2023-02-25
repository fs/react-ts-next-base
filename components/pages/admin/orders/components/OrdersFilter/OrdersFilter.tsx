import React from 'react';

import MultiSelect from 'components/shared/atoms/MultiSelect';

import { OrderExecutionStatusEnum, OrderReservationStatusEnum } from 'graphql/types';
import { TConfig } from '../../types';

const executionStatusOptions = [
  { value: OrderExecutionStatusEnum.Confirmed, label: 'Подтвержден' },
  { value: OrderExecutionStatusEnum.DisputeOpened, label: 'Открыт спор' },
  { value: OrderExecutionStatusEnum.InAssembly, label: 'В сборке' },
  { value: OrderExecutionStatusEnum.InTransit, label: 'В пути' },
  { value: OrderExecutionStatusEnum.MedagregatorIntervened, label: 'Вмешался Medagregator' },
  { value: OrderExecutionStatusEnum.PaymentPending, label: 'Не оплачен' },
];

const reservationStatusOptions = [
  { value: OrderReservationStatusEnum.Confirmed, label: 'Подтвержден' },
  { value: OrderReservationStatusEnum.PendingConfirmation, label: 'Ожидает подтверждения' },
  { value: OrderReservationStatusEnum.SupportRequested, label: 'Ожидает звонка' },
];

export const filterOptions = {
  unformed: reservationStatusOptions,
  processing: executionStatusOptions,
  finished: undefined,
};

const OrdersFilter = ({
  onChange,
  filterBy,
  activeTab,
}: {
  onChange: (params?: string) => void;
  filterBy: OrderExecutionStatusEnum[] | OrderReservationStatusEnum[];
  activeTab: TConfig;
}) => {
  if (filterOptions[activeTab]) {
    return (
      <MultiSelect
        $width="10rem"
        name="ordersFilter"
        options={filterOptions[activeTab] || []}
        labelAll="Все заказы"
        selected={filterBy}
        onChange={onChange}
        variant="light"
      />
    );
  }
  return null;
};

export default OrdersFilter;
