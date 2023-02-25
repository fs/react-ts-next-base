import React from 'react';

import SearchForm from 'components/shared/molecules/SearchForm';
import Sorter from 'components/shared/atoms/Sorter';

import { productSortValues } from 'config/constants/productSortValues';
import StatusesFilter from '../StatusesFilter';
import { StatusesFilterBy } from '../StatusesFilter/constants';
import { SearchBarWrapper, FiltersWrapper, SorterWrapper } from './styled';

type TOrdersSearchBar = {
  query: { [key: string]: string };
  filterBy: StatusesFilterBy;
  isUserBuyer: boolean;
};

const OrdersSearchBar = ({ query, filterBy, isUserBuyer }: TOrdersSearchBar) => {
  const { orderId, productSearchQuery } = query;

  const searchFormFields = [
    {
      placeholder: 'Заказ №',
      name: 'orderId',
      initialValue: orderId || '',
      width: '60%',
    },
    {
      placeholder: 'Наименование / Код',
      name: 'productSearchQuery',
      testId: 'search-input',
      initialValue: productSearchQuery || '',
    },
  ];

  return (
    <SearchBarWrapper>
      <SearchForm customFields={searchFormFields} />
      <FiltersWrapper>
        <SorterWrapper>
          <Sorter options={productSortValues} />
        </SorterWrapper>

        <SorterWrapper>
          <StatusesFilter query={query} filterBy={filterBy} isUserBuyer={isUserBuyer} />
        </SorterWrapper>
      </FiltersWrapper>
    </SearchBarWrapper>
  );
};

export default OrdersSearchBar;
