import React from 'react';
import useRouter from 'hooks/useRouter';

import MultiSelect from 'components/shared/atoms/MultiSelect';

import { EXECUTION_STATUS } from 'config/constants/executionStatus';
import { labelAll, options } from './constants';
import { TOption, TStatusesFilter } from './types';

const disabledStatusesSeller = [EXECUTION_STATUS.PAYMENT_PENDING];

const StatusesFilter = ({ query, filterBy, isUserBuyer }: TStatusesFilter) => {
  const { pushRoute } = useRouter();

  const onChangeFilter = (params?: string) => {
    pushRoute({
      query: {
        ...query,
        [filterBy]: params,
      },
    });
  };

  const filteredOptions: TOption[] = options[filterBy];
  const optionsForSeller = filteredOptions.filter(({ value }: TOption) => {
    return !disabledStatusesSeller.includes(value);
  });

  return (
    <MultiSelect
      name="statusesFilter"
      options={isUserBuyer ? options[filterBy] : optionsForSeller}
      labelAll={labelAll[filterBy]}
      selected={query[filterBy] ? query[filterBy]?.split(',') : []}
      onChange={onChangeFilter}
    />
  );
};

export default StatusesFilter;
