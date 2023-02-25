import React from 'react';
import { productSortValues } from 'config/constants/productSortValues';

import SearchForm from 'components/shared/molecules/SearchForm';
import Sorter from 'components/shared/atoms/Sorter';
import ViewToggler from 'components/shared/molecules/ViewToggler';

import { Wrapper, SearchFormWrapper, OptionsWrapper } from './styled';

const ProductListBar = ({ view, setView }) => {
  return (
    <Wrapper>
      <SearchFormWrapper>
        <SearchForm placeholder="Наименование / Код" />
      </SearchFormWrapper>
      <OptionsWrapper>
        <Sorter options={productSortValues} $width="11rem" />
        <ViewToggler view={view} setView={setView} />
      </OptionsWrapper>
    </Wrapper>
  );
};

export default ProductListBar;
