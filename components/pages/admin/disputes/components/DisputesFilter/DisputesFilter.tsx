import React from 'react';

import { DisputeStatusEnum } from 'graphql/types';

import MultiSelect from 'components/shared/atoms/MultiSelect';

const options = [
  { value: DisputeStatusEnum.Discussing, label: 'Переговоры по спору' },
  { value: DisputeStatusEnum.ProposalAccepted, label: 'Принято решение' },
  { value: DisputeStatusEnum.MedagregatorIntervened, label: 'Вмешался Medagregator' },
  { value: DisputeStatusEnum.Finished, label: 'Закрытые споры' },
  { value: DisputeStatusEnum.Canceled, label: 'Отмененные споры' },
];

type TDisputesFilter = {
  disputeStatuses: DisputeStatusEnum[];
  onChangeFilter: (params?: string) => void;
};

const DisputesFilter = ({ disputeStatuses, onChangeFilter }: TDisputesFilter) => {
  return (
    <MultiSelect
      $width="13rem"
      name="disputesFilter"
      options={options}
      labelAll="Все статусы"
      selected={disputeStatuses}
      onChange={onChangeFilter}
      variant="light"
    />
  );
};

export default DisputesFilter;
