import React from 'react';
import useRouter from 'hooks/useRouter';

import SearchForm from 'components/shared/molecules/SearchForm';
import SearchDate from 'components/shared/molecules/SearchDate';

import { SearchBarWrapper, SearchDateWrapper } from './styled';

const AnalyticalAccountSearchBar = ({ query }) => {
  const { pushRoute } = useRouter();

  const onChangeDateFilterQuery = ({ startDate, endDate }) => {
    pushRoute({
      query: {
        ...query,
        startDate: startDate ? startDate.split('T')[0] : undefined,
        endDate: endDate ? endDate.split('T')[0] : undefined,
      },
    });
  };

  return (
    <SearchBarWrapper>
      <SearchForm placeholder="Поиск по номеру заказа" />
      <SearchDateWrapper>
        <SearchDate onSubmit={onChangeDateFilterQuery} query={query} />
      </SearchDateWrapper>
    </SearchBarWrapper>
  );
};

export default AnalyticalAccountSearchBar;
