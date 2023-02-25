import React from 'react';
import useRouter from 'hooks/useRouter';

import MultiSelect from 'components/shared/atoms/MultiSelect';
import SearchForm from 'components/shared/molecules/SearchForm';
import Sorter from 'components/shared/atoms/Sorter';

import { productSortValues } from 'config/constants/productSortValues';

import { StatusEnum } from 'graphql/types';
import { SearchWrapper, FiltersWrapper, SorterWrapper, FilterWrapper } from './styled';
import { productTypes } from '../../constants';

const options = [
  { value: StatusEnum.Verified, label: 'Проверенные' },
  { value: StatusEnum.NotVerified, label: 'На проверке' },
  { value: StatusEnum.OutOfStock, label: 'Закончившиеся' },
];

const ProductsSearchBar = ({ query, statuses }) => {
  const { type } = query;
  const showFilter = type === productTypes.ACTIVE || !type;

  const { pushRoute } = useRouter();

  const onChangeFilter = params => {
    pushRoute({
      query: {
        ...query,
        productStatuses: params,
      },
    });
  };

  return (
    <SearchWrapper showFilter={showFilter}>
      <SearchForm placeholder="Наименование / Код" />

      <FiltersWrapper showFilter={showFilter}>
        <SorterWrapper>
          <Sorter options={productSortValues} />
        </SorterWrapper>

        {showFilter && (
          <FilterWrapper>
            <MultiSelect
              name="productsFilter"
              options={options}
              labelAll="Все товары"
              selected={statuses}
              onChange={onChangeFilter}
            />
          </FilterWrapper>
        )}
      </FiltersWrapper>
    </SearchWrapper>
  );
};

export default ProductsSearchBar;
