import React from 'react';

import Sorter from 'components/shared/atoms/Sorter';
import { UserOrderEnum } from 'graphql/types';

const options = [
  { value: '', label: 'По умолчанию' },
  { value: UserOrderEnum.LastName, label: 'Фамилии по алфавиту' },
  { value: UserOrderEnum.CreatedAtDesc, label: 'Дата по убыванию' },
  { value: UserOrderEnum.CreatedAtAsc, label: 'Дата по возрастанию' },
  { value: UserOrderEnum.Email, label: 'e-mail по алфавиту' },
];

const UsersSorter = () => {
  return <Sorter options={options} variant="light" $width="16rem" />;
};

export default UsersSorter;
