import React from 'react';
import useRouter from 'hooks/useRouter';

import MultiSelect from 'components/shared/atoms/MultiSelect';

import { SELLER, BUYER } from 'config/constants/directions';
import { URGENT } from '../../constants';

const options = [
  { value: SELLER, label: 'Продавцы' },
  { value: BUYER, label: 'Покупатели' },
  { value: URGENT, label: 'Самые срочные' },
];

const RequestsFilter = ({ query }) => {
  const { filterBy } = query;
  const { pushRoute } = useRouter();

  const onChangeFilter = params => {
    pushRoute({
      query: {
        ...query,
        filterBy: params,
      },
    });
  };

  return (
    <MultiSelect
      $width="10rem"
      name="requestsFilter"
      options={options}
      labelAll="Все заявки"
      selected={filterBy ? filterBy?.split(',') : undefined}
      onChange={onChangeFilter}
      variant="light"
    />
  );
};

export default RequestsFilter;
